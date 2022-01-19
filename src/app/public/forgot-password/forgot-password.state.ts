import { createFormGroupState, FormGroupState } from 'ngrx-forms';
import { PublicForgotPasswordPageForm } from './shared/forms';

export class PublicForgotPasswordPageState {
  public isSubmitting: boolean;
  public isSubmittingFailed: boolean;
  public isRecoveryEmailSent: boolean;
  public formState: FormGroupState<PublicForgotPasswordPageForm>;

  constructor() {
    this.isSubmitting = false;
    this.isSubmittingFailed = false;
    this.isRecoveryEmailSent = false;
    this.formState = createFormGroupState('PublicForgotPasswordForm', new PublicForgotPasswordPageForm());
  }
}
