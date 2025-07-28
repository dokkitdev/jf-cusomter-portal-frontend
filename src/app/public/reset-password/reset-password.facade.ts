import {
  Actions,
  disable,
  enable,
  formGroupReducer,
  FormGroupState,
  markAsSubmitted,
  MarkAsSubmittedAction,
  updateGroup,
  validate
} from 'ngrx-forms';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ComponentStore } from '@ngrx/component-store';
import { AuthService, RestorePasswordRequest } from '@shared/auth';
import { exhaustMap, filter, withLatestFrom } from 'rxjs/operators';
import { equalTo, minLength, required } from 'ngrx-forms/validation';
import { PublicResetPasswordPageState } from './reset-password.state';
import { PublicResetPasswordPageForm } from './shared/forms';
import { Router } from '@angular/router';
import { containDigit } from '@shared/validators';
import { NavigationSelectors } from '@shared/navigation';
import { Store } from '@ngrx/store';
import { AppState } from '@shared/store';
import { tapResponse } from '@ngrx/operators';

@Injectable()
export class PublicResetPasswordPageFacade {
  public get isSubmitting$(): Observable<boolean> {
    return this.componentStore.select((state) => state.isSubmitting);
  }

  public get isSubmittingFailed$(): Observable<boolean> {
    return this.componentStore.select((state) => state.isSubmittingFailed);
  }

  public get isTokenChecking$(): Observable<boolean> {
    return this.componentStore.select((state) => state.isTokenChecking);
  }

  public get isInvalidToken$(): Observable<boolean> {
    return this.componentStore.select((state) => state.isInvalidToken);
  }

  public get isNewUser$(): Observable<boolean> {
    return this.componentStore.select((state) => state.isNewUser);
  }

  public get formState$(): Observable<FormGroupState<PublicResetPasswordPageForm>> {
    return this.componentStore.select((state) => state.formState);
  }

  private tryRestorePasswordEffect$: () => Observable<void>;
  private checkRestoreTokenEffect$: () => Observable<void>;

  constructor(
    private readonly componentStore: ComponentStore<PublicResetPasswordPageState>,
    private readonly authService: AuthService,
    private readonly store: Store<AppState>,
    private readonly router: Router
  ) {
    this.resetState();
    this.registerTryRestorePasswordEffect();
    this.registerCheckRestoreTokenEffect();
    this.validateForm();
  }

  public resetState(): void {
    this.componentStore.setState(new PublicResetPasswordPageState());
  }

  public checkRestoreToken(): void {
    this.checkRestoreTokenEffect$();
  }

  public restorePassword(): void {
    this.tryRestorePasswordEffect$();
  }

  public handleFormStateAction(action: Actions<any>): void {
    this.updateFormState(action);

    if (action instanceof MarkAsSubmittedAction) {
      this.markFormStateAsSubmitted();
    }

    this.validateForm();
  }

  private validateForm(): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        formState: updateGroup<PublicResetPasswordPageForm>(
          state.formState,
          {
            password: validate(required, containDigit, minLength(8)),
            confirmPassword: (controlState, formState) =>
              validate(controlState, required, equalTo(formState.value.password))
          }
        )
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

  private markFormStateAsSubmitted(): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        formState: markAsSubmitted(state.formState)
      })
    )();
  }

  private updateIsNewUser(value: boolean): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        isNewUser: value
      })
    )();
  }

  private updateStateDueToStartRestore(): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        formState: disable(state.formState),
        isSubmitting: true,
        isSubmittingFailed: false
      })
    )();
  }

  private updateStateDueToFailedRestore(): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        formState: enable(state.formState),
        isSubmitting: false,
        isSubmittingFailed: true
      })
    )();
  }

  private updateStateDueToStartCheckToken(): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        isTokenChecking: true
      })
    )();
  }

  private updateStateDueToSuccessCheckToken(): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        isTokenChecking: false
      })
    )();
  }

  private updateStateDueToFailedCheckToken(): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        isTokenChecking: false,
        isInvalidToken: true
      })
    )();
  }

  private registerTryRestorePasswordEffect(): void {
    this.tryRestorePasswordEffect$ = this.componentStore.effect((origin$: Observable<string>) =>
      origin$.pipe(
        withLatestFrom(
          this.formState$,
          this.store.select(NavigationSelectors.selectRouteParam('token'))
        ),
        filter(([_, formState]) => formState.isValid),
        exhaustMap(([_, formState, token]) => {
          this.updateStateDueToStartRestore();

          return this.tryRestorePassword(
            new RestorePasswordRequest({ password: formState.value.password, token })
          );
        })
      )
    );
  }

  private registerCheckRestoreTokenEffect(): void {
    this.checkRestoreTokenEffect$ = this.componentStore.effect((origin$: Observable<string>) =>
      origin$.pipe(
        withLatestFrom(
          this.store.select(NavigationSelectors.selectRouteParam('token'))
        ),
        exhaustMap(([_, token]) => {
          this.updateIsNewUser(this.router.url.includes('add-password'));
          this.updateStateDueToStartCheckToken();

          return this.tryCheckRestoreToken(String(token));
        })
      )
    );
  }

  private tryRestorePassword(request: RestorePasswordRequest): Observable<void> {
    return this.authService
      .restorePasswordRequest(request)
      .pipe(
        tapResponse(
          () => this.router.navigateByUrl('/login'),
          () => this.updateStateDueToFailedRestore()
        )
      );
  }

  private tryCheckRestoreToken(token: string): Observable<void> {
    return this.authService
      .checkRestoreToken(token)
      .pipe(
        tapResponse(
          () => this.updateStateDueToSuccessCheckToken(),
          () => this.updateStateDueToFailedCheckToken()
        )
      );
  }
}
