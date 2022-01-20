import { createFormGroupState, FormGroupState } from 'ngrx-forms';
import { PublicResetPasswordPageForm } from './shared/forms';

export class PublicResetPasswordPageState {
  public isSubmitting: boolean;
  public isSubmittingFailed: boolean;
  public isTokenChecking: boolean;
  public isInvalidToken: boolean;
  public isNewUser: boolean;
  public formState: FormGroupState<PublicResetPasswordPageForm>;

  constructor() {
    this.isSubmitting = false;
    this.isSubmittingFailed = false;
    this.isTokenChecking = false;
    this.isInvalidToken = false;
    this.isNewUser = false;
    this.formState = createFormGroupState('PublicResetPasswordForm', new PublicResetPasswordPageForm());
  }
}
