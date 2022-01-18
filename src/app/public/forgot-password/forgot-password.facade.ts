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
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { AuthService } from '@shared/auth';
import { exhaustMap, filter, withLatestFrom } from 'rxjs/operators';
import { email, required } from 'ngrx-forms/validation';
import { PublicForgotPasswordPageState } from './forgot-password.state';
import { PublicForgotPasswordPageForm } from './shared/forms';

@Injectable()
export class PublicForgotPasswordPageFacade {
  public get isSubmitting$(): Observable<boolean> {
    return this.componentStore.select((state) => state.isSubmitting);
  }

  public get isSubmittingFailed$(): Observable<boolean> {
    return this.componentStore.select((state) => state.isSubmittingFailed);
  }

  public get isRecoveryEmailSent$(): Observable<boolean> {
    return this.componentStore.select((state) => state.isRecoveryEmailSent);
  }

  public get formState$(): Observable<FormGroupState<PublicForgotPasswordPageForm>> {
    return this.componentStore.select((state) => state.formState);
  }

  private trySendRecoveryEmailEffect$: () => Observable<void>;

  constructor(
    private readonly componentStore: ComponentStore<PublicForgotPasswordPageState>,
    private readonly authService: AuthService
  ) {
    this.resetState();
    this.registerTrySendRecoveryEmailEffect();
    this.validateForm();
  }

  public resetState(): void {
    this.componentStore.setState(new PublicForgotPasswordPageState());
  }

  public sendRecoveryEmail(): void {
    this.trySendRecoveryEmailEffect$();
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
        formState: updateGroup<PublicForgotPasswordPageForm>(
          state.formState,
          {
            email: validate(required, email)
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

  private updateStateDueToStartRequest(): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        formState: disable(state.formState),
        isSubmitting: true,
        isSubmittingFailed: false
      })
    )();
  }

  private updateStateDueToSuccessRequest(): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        formState: disable(state.formState),
        isSubmitting: false,
        isRecoveryEmailSent: true
      })
    )();
  }

  private updateStateDueToFailedRequest(): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        formState: enable(state.formState),
        isSubmitting: false,
        isSubmittingFailed: true
      })
    )();
  }

  private registerTrySendRecoveryEmailEffect(): void {
    this.trySendRecoveryEmailEffect$ = this.componentStore.effect((origin$: Observable<string>) =>
      origin$.pipe(
        withLatestFrom(
          this.formState$
        ),
        filter(([_, formState]) => formState.isValid),
        exhaustMap(([_, formState]) => {
          this.updateStateDueToStartRequest();

          return this.trySendRecoveryEmail(formState.value.email);
        })
      )
    );
  }

  private trySendRecoveryEmail(recoveryEmail: string): Observable<void> {
    return this.authService
      .sendRecoveryEmail(recoveryEmail)
      .pipe(
        tapResponse(
          () => this.updateStateDueToSuccessRequest(),
          () => this.updateStateDueToFailedRequest()
        )
      );
  }
}
