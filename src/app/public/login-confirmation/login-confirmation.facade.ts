import {
  Actions,
  disable,
  enable,
  formGroupReducer,
  FormGroupState,
  markAsSubmitted,
  MarkAsSubmittedAction,
  setValue,
  updateGroup,
  validate,
} from 'ngrx-forms';
import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { tapResponse, concatLatestFrom } from '@ngrx/operators';
import { Observable } from 'rxjs';
import { exhaustMap, filter, tap, withLatestFrom } from 'rxjs/operators';
import { AuthResponse } from '@ronas-it/angular-common';
import { AuthCredentials, AuthService } from '@shared/auth';
import { Router } from '@angular/router';
import { email, minLength, required } from 'ngrx-forms/validation';
import { User } from '@shared/user';
import { PublicLoginConfirmationPageForm } from './shared/forms';
import { PublicLoginConfirmationPageState } from './login-confirmation.state';
import { NavigationSelectors } from '@shared/navigation';
import { Store } from '@ngrx/store';
import { AppState } from '@shared/store';
import { PublicLoginConfirmationQueryParameters } from './shared/models';

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

  private tryConfirmLogin$: () => Observable<void>;
  private fillFormByQueryParams$: () => Observable<void>;

  constructor(
    private readonly componentStore: ComponentStore<PublicLoginConfirmationPageState>,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly store: Store<AppState>
  ) {
    this.resetState();
    this.registerTryConfirmLoginEffect();
    this.validateForm();
    this.registerFillFormByQueryParams();
    this.disableNotEditableControls();
  }

  public resetState(): void {
    this.componentStore.setState(new PublicLoginConfirmationPageState());
  }

  public confirmLogin(): void {
    this.tryConfirmLogin$();
  }

  public fillFormByQueryParams(): void {
    this.fillFormByQueryParams$();
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
        email: validate(required, email),
        code: validate(required, minLength(6)),
        password: validate(required),
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
      isConfirmLoginFailed: false,
    }))();
  }

  private updateStateDueToFailedLogin(): void {
    this.componentStore.updater((state) => ({
      ...state,
      formState: enable(state.formState),
      isSubmitting: false,
      isConfirmLoginFailed: true,
    }))();
  }

  private markFormStateAsSubmitted(): void {
    this.componentStore.updater((state) => ({
      ...state,
      formState: markAsSubmitted(state.formState),
    }))();
  }

  private registerTryConfirmLoginEffect(): void {
    this.tryConfirmLogin$ = this.componentStore.effect(
      (origin$: Observable<string>) =>
        origin$.pipe(
          withLatestFrom(this.formState$),
          filter(([_, formState]) => formState.isValid),
          exhaustMap(([_, formState]) => {
            this.updateStateDueToStartLogin();
            const credentials = new AuthCredentials(formState.value);

            return this.tryConfirmLogin(credentials);
          })
        )
    );
  }

  private disableNotEditableControls(): void {
    this.componentStore.updater((state) => ({
      ...state,
      formState: updateGroup<PublicLoginConfirmationPageForm>(state.formState, {
        email: (control) => disable(control),
      }),
    }))();
  }

  private updateFormByQueryParams(
    parameters: PublicLoginConfirmationQueryParameters
  ): void {
    this.componentStore.updater((state) => ({
      ...state,
      email,
      formState: updateGroup<PublicLoginConfirmationPageForm>(state.formState, {
        email: setValue(parameters.email as string),
      }),
    }))();
  }

  private registerFillFormByQueryParams(): void {
    this.fillFormByQueryParams$ = this.componentStore.effect(
      (origin$: Observable<string>) =>
        origin$.pipe(
          concatLatestFrom(() =>
            this.store.select(NavigationSelectors.selectQueryParams)
          ),
          tap(([_, queryParams]) => {
            const parameters = new PublicLoginConfirmationQueryParameters({
              email: queryParams.email,
            });

            this.updateFormByQueryParams(parameters);
          })
        )
    );
  }

  private tryConfirmLogin(
    credentials: AuthCredentials
  ): Observable<AuthResponse<User>> {
    return this.authService.signIn(credentials, true).pipe(
      tapResponse(
        () => this.router.navigate(['/account']),
        () => this.updateStateDueToFailedLogin()
      )
    );
  }
}
