import { createFormGroupState, FormGroupState } from 'ngrx-forms';
import { PublicLoginPageForm } from './shared/forms';

export class PublicLoginPageState {
  public isSubmitting: boolean;
  public isLoginFailed: boolean;
  public formState: FormGroupState<PublicLoginPageForm>;

  constructor() {
    this.isSubmitting = false;
    this.isLoginFailed = false;
    this.formState = createFormGroupState('PublicLoginForm', new PublicLoginPageForm());
  }
}
