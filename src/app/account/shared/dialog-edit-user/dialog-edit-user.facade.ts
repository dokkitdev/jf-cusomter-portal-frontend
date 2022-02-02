import { UserRole } from './../../../shared/user/enums/group';
import { positiveNumber } from './../../../shared/validators/positive-number';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Actions,
  disable,
  enable,
  formGroupReducer,
  FormGroupState,
  setUserDefinedProperty,
  setValue,
  updateArray,
  updateGroup,
  validate
} from 'ngrx-forms';
import { AccountDialogEditUserForm } from './forms';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { AccountDialogEditUserComponentState } from './dialog-edit-user.state';
import { email, maxLength } from 'ngrx-forms/validation';
import { exhaustMap, filter, tap, withLatestFrom } from 'rxjs/operators';
import { NotificationService } from '@shared/notification';
import { TranslateService } from '@ngx-translate/core';
import { compose, Store } from '@ngrx/store';
import { AppState } from '@shared/store';
import { DialogService } from '@shared/dialog';
import { User, UserService } from '@shared/user';
import { trimmedRequired } from '@shared/validators';
import { AccountDialogEditUserActions } from './store';
import { HttpErrorResponse } from '@angular/common/http';
import { keys, omit, pickBy } from 'lodash';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AccountDialogEditUserComponentFacade {
  public get isSendingRequest$(): Observable<boolean> {
    return this.componentStore.select((state) => state.isSendingRequest);
  }

  public get isEditMode$(): Observable<boolean> {
    return this.componentStore.select((state) => state.isEditMode);
  }

  public get user$(): Observable<User> {
    return this.componentStore.select((state) => state.user);
  }

  public get formState$(): Observable<FormGroupState<AccountDialogEditUserForm>> {
    return this.componentStore.select((state) => state.formState);
  }

  public get userRole$(): Observable<UserRole> {
    return this.componentStore.select((state) => state.formState.controls.roleID.value);
  }

  public get isRoleCustomer$(): Observable<boolean> {
    return this.componentStore.select(
      this.userRole$,
      (role: UserRole) => role === UserRole.CUSTOMER
    );
  }

  private initComponentEffect$: (user: User) => Observable<void>;
  private saveChangesEffect$: () => Observable<void>;

  constructor(
    private readonly componentStore: ComponentStore<AccountDialogEditUserComponentState>,
    private readonly store: Store<AppState>,
    private readonly userService: UserService,
    private readonly dialogService: DialogService,
    private readonly notificationService: NotificationService,
    private readonly translateService: TranslateService
  ) {
    this.resetState();

    this.registerInitComponentEffect();
    this.registerSaveChangesEffect();
  }

  public resetState(): void {
    this.componentStore.setState(new AccountDialogEditUserComponentState());
  }

  public setIsEditMode(value: boolean): void {
    this.updateIsEditMode(value);
  }

  public initComponent(user: User): void {
    this.initComponentEffect$(user);
  }

  public saveChanges(): void {
    this.saveChangesEffect$();
  }

  public handleFormStateAction(action: Actions<any>): void {
    this.updateFormState(action);

    this.validateForm();
  }

  private getServerErrorMessage(response: unknown): string {
    return (response as HttpErrorResponse).error.error;
  }

  private updateIsEditMode(value: boolean): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        isEditMode: value
      })
    )();
  }

  private updateFormState(action: Actions<any>): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        formState: formGroupReducer(state.formState, action)
      })
    )();
  }

  private validateForm(): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        formState: updateGroup<AccountDialogEditUserForm>(
          state.formState,
          {
            name: validate(trimmedRequired, maxLength(255)),
            email: validate(trimmedRequired, email),
            customerIDs: updateArray(validate(positiveNumber))
          }
        )
      })
    )();
  }

  private updateIsSendingRequest(value: boolean): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        isSendingRequest: value
      })
    )();
  }

  private toggleDisablingForm(value: boolean): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        formState: (value)
          ? disable(state.formState)
          : enable(state.formState)
      })
    )();
  }

  private updateUserFormState(user: User): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        user,
        formState: updateGroup<AccountDialogEditUserForm>(
          state.formState,
          {
            name: setValue(user.name),
            email: setValue(user.email),
            customerIDs: compose(
              setValue(user.customers?.map((item) => item.id) || []),
              updateArray((control) => setUserDefinedProperty(control, 'id', uuidv4()))
            ),
            roleID: setValue(user.roleID)
          }
        )
      })
    )();
  }

  private registerInitComponentEffect(): void {
    this.initComponentEffect$ = this.componentStore.effect((origin$: Observable<User>) =>
      origin$.pipe(
        withLatestFrom(
          this.isEditMode$
        ),
        filter(([_, isEditMode]) => isEditMode),
        tap(([user]) => this.updateUserFormState(user))
      )
    );
  }

  private registerSaveChangesEffect(): void {
    this.saveChangesEffect$ = this.componentStore.effect((origin$) =>
      origin$.pipe(
        withLatestFrom(
          this.formState$,
          this.isEditMode$,
          this.user$
        ),
        filter(([_, formState]) => formState.isValid),
        exhaustMap(([_, formState, isEditMode, user]) => {
          this.updateIsSendingRequest(true);
          this.toggleDisablingForm(true);

          const omittedFields = keys(pickBy({
            email: user.email === formState.value.email,
            customerIDs: formState.value.roleID !== UserRole.CUSTOMER
          }));
          const changedUser = new User({
            id: user.id,
            ...omit(formState.value, omittedFields)
          });

          return (isEditMode)
            ? this.tryToUpdateUser(changedUser)
            : this.tryToCreateUser(changedUser);
        })
      )
    );
  }

  private endRequestFailed(errorResponse: unknown): void {
    const errorMessage = this.getServerErrorMessage(errorResponse);

    this.notificationService.error(
      this.translateService.instant(errorMessage || 'ACCOUNT.SHARED.DIALOG_EDIT_USER.NOTIFICATIONS.TEXT_ERROR')
    );

    this.updateIsSendingRequest(false);
    this.toggleDisablingForm(false);
  }

  private tryToCreateUser(user: User): Observable<User> {
    return this.userService
      .create(user)
      .pipe(
        tapResponse(
          (response: User) => {
            this.updateIsSendingRequest(false);
            this.toggleDisablingForm(false);

            this.dialogService.close();

            this.store.dispatch(AccountDialogEditUserActions.createUserSuccess({ userID: response.id }));

            this.notificationService.success(
              this.translateService.instant('ACCOUNT.SHARED.DIALOG_EDIT_USER.NOTIFICATIONS.TEXT_USER_CREATED')
            );
          },
          (errorResponse) => this.endRequestFailed(errorResponse)
        )
      );
  }

  private tryToUpdateUser(user: User): Observable<void> {
    return this.userService
      .update(user)
      .pipe(
        tapResponse(
          () => {
            this.updateIsSendingRequest(false);
            this.toggleDisablingForm(false);

            this.dialogService.close();

            this.store.dispatch(AccountDialogEditUserActions.updateUserSuccess({ userID: user.id }));

            this.notificationService.success(
              this.translateService.instant('ACCOUNT.SHARED.DIALOG_EDIT_USER.NOTIFICATIONS.TEXT_USER_UPDATED')
            );
          },
          (errorResponse) => this.endRequestFailed(errorResponse)
        )
      );
  }
}
