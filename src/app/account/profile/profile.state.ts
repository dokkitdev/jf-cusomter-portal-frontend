import { createFormGroupState, FormGroupState } from 'ngrx-forms';
import { AccountProfilePageForm } from './shared/forms';

export class AccountProfilePageState {
  public isLoading: boolean;
  public isSubmitting: boolean;
  public isPasswordBlockVisible: boolean;
  public formState: FormGroupState<AccountProfilePageForm>;

  constructor() {
    this.isLoading = false;
    this.isSubmitting = false;
    this.isPasswordBlockVisible = false;
    this.formState = createFormGroupState('AccountProfilePageForm', new AccountProfilePageForm());
  }
}
