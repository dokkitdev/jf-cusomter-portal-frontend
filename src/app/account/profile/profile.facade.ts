import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { tapResponse } from '@ngrx/operators';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from '@shared/notification';
import { User, UserService } from '@shared/user';
import { containDigit, trimmedRequired } from '@shared/validators';
import {
  Actions,
  disable,
  enable,
  formGroupReducer,
  FormGroupState,
  markAsUnsubmitted,
  setValue,
  updateGroup,
  validate
} from 'ngrx-forms';
import { email, equalTo, minLength } from 'ngrx-forms/validation';
import { Observable } from 'rxjs';
import { exhaustMap, filter, switchMap, withLatestFrom } from 'rxjs/operators';
import { AccountProfilePageState } from './profile.state';
import { AccountProfilePageForm } from './shared/forms';

@Injectable()
export class AccountProfilePageFacade {
  public get isLoading$(): Observable<boolean> {
    return this.componentStore.select((state) => state.isLoading);
  }

  public get isSubmitting$(): Observable<boolean> {
    return this.componentStore.select((state) => state.isSubmitting);
  }

  public get isPasswordBlockVisible$(): Observable<boolean> {
    return this.componentStore.select((state) => state.isPasswordBlockVisible);
  }

  public get profile$(): Observable<User> {
    return this.userService.profile$;
  }

  public get formState$(): Observable<FormGroupState<AccountProfilePageForm>> {
    return this.componentStore.select((state) => state.formState);
  }

  private initFormEffect$: () => Observable<void>;
  private saveChangesEffect$: () => Observable<void>;

  constructor(
    private readonly componentStore: ComponentStore<AccountProfilePageState>,
    private readonly userService: UserService,
    private readonly translateService: TranslateService,
    private readonly notificationService: NotificationService
  ) {
    this.resetState();

    this.registerInitFormEffect();
    this.registerSaveChangesEffect();
  }

  public resetState(): void {
    this.componentStore.setState(new AccountProfilePageState());
  }

  public handleFormStateAction(action: Actions<any>): void {
    this.updateFormState(action);

    this.validateForm();
  }

  public initForm(): void {
    this.initFormEffect$();
  }

  public saveChanges(): void {
    this.saveChangesEffect$();
  }

  public togglePasswordBlockVisibility(isVisible: boolean): void {
    this.updateIsPasswordBlockVisible(isVisible);
  }

  private validateForm(): void {
    this.componentStore.updater((state) => ({
      ...state,
      formState: updateGroup<AccountProfilePageForm>(state.formState, {
        name: validate(trimmedRequired),
        email: validate(email, trimmedRequired),
        oldPassword: (control, formState) =>
          validate(control, formState.value.shouldValidatePassword ? [trimmedRequired] : []),
        password: (control, formState) =>
          validate(
            control,
            formState.value.shouldValidatePassword ? [trimmedRequired, containDigit, minLength(8)] : []
          ),
        passwordConfirmation: (control, formState) =>
          validate(
            control,
            formState.value.shouldValidatePassword ? [trimmedRequired, equalTo(formState.value.password)] : []
          )
      })
    }))();
  }

  private toggleDisablingForm(value: boolean): void {
    this.componentStore.updater((state) => ({
      ...state,
      formState: value ? disable(state.formState) : enable(state.formState)
    }))();
  }

  private updateFormState(action: Actions<any>): void {
    this.componentStore.updater((state) => ({
      ...state,
      formState: formGroupReducer(state.formState, action)
    }))();
  }

  private updateProfileFormState(profile: User): void {
    this.componentStore.updater((state) => ({
      ...state,
      formState: updateGroup<AccountProfilePageForm>(state.formState, {
        name: setValue(profile.name),
        email: setValue(profile.email)
      })
    }))();
  }

  private updateIsLoading(value: boolean): void {
    this.componentStore.updater((state) => ({
      ...state,
      isLoading: value
    }))();
  }

  private updateIsSubmitting(value: boolean): void {
    this.componentStore.updater((state) => ({
      ...state,
      isSubmitting: value
    }))();
  }

  private updateIsPasswordBlockVisible(value: boolean): void {
    this.componentStore.updater((state) => ({
      ...state,
      isPasswordBlockVisible: value,
      formState: updateGroup<AccountProfilePageForm>(state.formState, {
        shouldValidatePassword: setValue(value)
      })
    }))();

    this.validateForm();
  }

  private resetFormPasswords(): void {
    this.componentStore.updater((state) => ({
      ...state,
      formState: updateGroup<AccountProfilePageForm>(state.formState, {
        oldPassword: setValue(''),
        password: setValue(''),
        passwordConfirmation: setValue('')
      })
    }))();

    this.validateForm();
  }

  private markFormAsUnsubmitted(): void {
    this.componentStore.updater((state) => ({
      ...state,
      formState: markAsUnsubmitted(state.formState)
    }))();

    this.validateForm();
  }

  private showErrorNotification(response: unknown): void {
    let errorMessage;
    if (response instanceof HttpErrorResponse) {
      const errorKeys = Object.keys(response.error.errors || {});
      if (errorKeys.length) {
        errorMessage = response.error.errors[errorKeys[0]][0];
      } else {
        errorMessage = response.error.error;
      }
    }
    this.notificationService.error(
      errorMessage || this.translateService.instant('ACCOUNT.PROFILE.NOTIFICATIONS.TEXT_ERROR')
    );
  }

  private registerInitFormEffect(): void {
    this.initFormEffect$ = this.componentStore.effect((origin$) =>
      origin$.pipe(
        switchMap(() => {
          this.updateIsLoading(true);

          return this.userService.loadProfile().pipe(
            tapResponse(
              (profile) => {
                this.updateIsLoading(false);
                this.updateProfileFormState(profile);
              },
              () => this.updateIsLoading(false)
            )
          );
        })
      )
    );
  }

  private registerSaveChangesEffect(): void {
    this.saveChangesEffect$ = this.componentStore.effect((origin$) =>
      origin$.pipe(
        withLatestFrom(this.formState$, this.isPasswordBlockVisible$, this.profile$),
        filter(([_, formState]) => formState.isValid),
        exhaustMap(([_, formState, isPasswordBlockVisible, profile]) => {
          this.updateIsSubmitting(true);
          this.toggleDisablingForm(true);

          const changedProfile = new User({
            name: formState.value.name
          });

          if (profile.email !== formState.value.email) {
            changedProfile.email = formState.value.email;
          }

          if (isPasswordBlockVisible) {
            changedProfile.oldPassword = formState.value.oldPassword;
            changedProfile.password = formState.value.password;
            changedProfile.passwordConfirmation = formState.value.passwordConfirmation;
          }

          return this.tryToUpdateProfile(profile, changedProfile);
        })
      )
    );
  }

  private tryToUpdateProfile(profile: User, changedProfile: User): Observable<void> {
    return this.userService.updateProfile(changedProfile).pipe(
      tapResponse(
        () => {
          this.updateIsSubmitting(false);
          this.toggleDisablingForm(false);
          this.updateIsPasswordBlockVisible(false);
          this.resetFormPasswords();
          this.markFormAsUnsubmitted();
          this.userService.setProfile(new User({ ...profile, name: changedProfile.name }));

          this.notificationService.success(
            this.translateService.instant('ACCOUNT.PROFILE.NOTIFICATIONS.TEXT_PROFILE_UPDATED')
          );
        },
        (errorResponse) => {
          this.updateIsSubmitting(false);
          this.toggleDisablingForm(false);
          this.showErrorNotification(errorResponse);
        }
      )
    );
  }
}
