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
import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Observable } from 'rxjs';
import { exhaustMap, filter, withLatestFrom } from 'rxjs/operators';
import { AuthCredentials, AuthResponse } from '@ronas-it/angular-common';
import { AuthService } from '@shared/auth';
import { Router } from '@angular/router';
import { email, required } from 'ngrx-forms/validation';
import { User } from '@shared/user';
import { PublicLoginConfirmationPageForm } from './shared/forms';
import { PublicLoginConfirmationPageState } from './login-confirmation.state';

@Injectable()
export class PublicLoginConfirmationPageFacade {
  public get isSubmitting$(): Observable<boolean> {
    return this.componentStore.select((state) => state.isSubmitting);
  }

  public get isConfirmLoginFailed$(): Observable<boolean> {
    return this.componentStore.select((state) => state.isConfirmLoginFailed);
  }

  public get formState$(): Observable<
    FormGroupState<PublicLoginConfirmationPageForm>
  > {
    return this.componentStore.select((state) => state.formState);
  }

  private tryLoginEffect$: () => Observable<void>;

  constructor(
    private readonly componentStore: ComponentStore<PublicLoginConfirmationPageState>,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
    this.resetState();
    this.registerTryConfirmLoginEffect();
    this.validateForm();
  }

  public resetState(): void {
    this.componentStore.setState(new PublicLoginConfirmationPageState());
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
      formState: updateGroup<PublicLoginConfirmationPageForm>(state.formState, {
        code: validate(required),
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

  private registerTryConfirmLoginEffect(): void {
    // this.tryLoginEffect$ = this.componentStore.effect(
    //   (origin$: Observable<string>) =>
    //     origin$.pipe(
    //       withLatestFrom(this.formState$),
    //       filter(([_, formState]) => formState.isValid),
    //       exhaustMap(([_, formState]) => {
    //         this.updateStateDueToStartLogin();
    //         const credentials = new AuthCredentials(formState.value);
    //         return this.tryAuthorize(credentials);
    //       })
    //     )
    // );
  }

  // private tryAuthorize(
  //   credentials: AuthCredentials
  // ): Observable<AuthResponse<User>> {
  //   return this.authService.authorize(credentials, true).pipe(
  //     tapResponse(
  //       () => this.router.navigate(['/account']),
  //       () => this.updateStateDueToFailedLogin()
  //     )
  //   );
  // }
}
