import {
  Actions,
  disable,
  enable,
  formGroupReducer,
  FormGroupState,
  markAsSubmitted,
  MarkAsSubmittedAction,
  updateGroup,
  validate,
} from 'ngrx-forms';
import { PublicLoginPageForm } from './shared/forms';
import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable } from 'rxjs';
import { exhaustMap, filter, withLatestFrom } from 'rxjs/operators';
import { AuthService } from '@shared/auth';
import { Router } from '@angular/router';
import { email as emailValidation, required } from 'ngrx-forms/validation';
import { PublicLoginPageState } from './login.state';
import { tapResponse } from '@ngrx/operators';

@Injectable()
export class PublicLoginPageFacade {
  public get isSubmitting$(): Observable<boolean> {
    return this.componentStore.select((state) => state.isSubmitting);
  }

  public get isLoginFailed$(): Observable<boolean> {
    return this.componentStore.select((state) => state.isLoginFailed);
  }

  public get formState$(): Observable<FormGroupState<PublicLoginPageForm>> {
    return this.componentStore.select((state) => state.formState);
  }

  private tryLoginEffect$: () => Observable<void>;

  constructor(
    private readonly componentStore: ComponentStore<PublicLoginPageState>,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
    this.resetState();
    this.registerTryLoginEffect();
    this.validateForm();
  }

  public resetState(): void {
    this.componentStore.setState(new PublicLoginPageState());
  }

  public tryLogin(): void {
    this.tryLoginEffect$();
  }

  public handleFormStateAction(action: Actions<any>): void {
    this.updateFormState(action);

    if (action instanceof MarkAsSubmittedAction) {
      this.markFormStateAsSubmitted();
    }

    this.validateForm();
  }

  private validateForm(): void {
    this.componentStore.updater((state) => ({
      ...state,
      formState: updateGroup<PublicLoginPageForm>(state.formState, {
        email: validate(required, emailValidation),
      }),
    }))();
  }

  private updateFormState(action: Actions<any>): void {
    this.componentStore.updater((state) => ({
      ...state,
      formState: formGroupReducer(state.formState, action),
    }))();
  }

  private updateStateDueToStartLogin(): void {
    this.componentStore.updater((state) => ({
      ...state,
      formState: disable(state.formState),
      isSubmitting: true,
      isLoginFailed: false,
    }))();
  }

  private updateStateDueToFailedLogin(): void {
    this.componentStore.updater((state) => ({
      ...state,
      formState: enable(state.formState),
      isSubmitting: false,
      isLoginFailed: true,
    }))();
  }

  private markFormStateAsSubmitted(): void {
    this.componentStore.updater((state) => ({
      ...state,
      formState: markAsSubmitted(state.formState),
    }))();
  }

  private registerTryLoginEffect(): void {
    this.tryLoginEffect$ = this.componentStore.effect(
      (origin$: Observable<string>) =>
        origin$.pipe(
          withLatestFrom(this.formState$),
          filter(([_, formState]) => formState.isValid),
          exhaustMap(([_, formState]) => {
            this.updateStateDueToStartLogin();

            return this.tryAuthorize(formState.value.email);
          })
        )
    );
  }

  private tryAuthorize(email: string): Observable<void> {
    return this.authService.sendAuthCode(email).pipe(
      tapResponse(
        () =>
          this.router.navigate(['/login-confirmation'], {
            queryParams: { email },
          }),
        () => this.updateStateDueToFailedLogin()
      )
    );
  }
}
