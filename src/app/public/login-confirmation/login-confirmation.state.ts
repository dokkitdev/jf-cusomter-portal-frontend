import { createFormGroupState, FormGroupState } from 'ngrx-forms';
import { PublicLoginConfirmationPageForm } from './shared/forms';

export class PublicLoginConfirmationPageState {
  public isSubmitting: boolean;
  public isConfirmLoginFailed: boolean;
  public formState: FormGroupState<PublicLoginConfirmationPageForm>;

  constructor() {
    this.isSubmitting = false;
    this.isConfirmLoginFailed = false;
    this.formState = createFormGroupState('PublicLoginConfirmationForm', new PublicLoginConfirmationPageForm());
  }
}
