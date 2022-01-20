import { User } from '@shared/user';
import { createFormGroupState, FormGroupState } from 'ngrx-forms';
import { AccountDialogEditUserForm } from './forms';

export class AccountDialogEditUserComponentState {
  public isSendingRequest: boolean;
  public isEditMode: boolean;
  public user: User;
  public formState: FormGroupState<AccountDialogEditUserForm>;

  constructor() {
    this.isSendingRequest = false;
    this.isEditMode = false;
    this.user = new User();
    this.formState = createFormGroupState('AccountDialogEditUserForm', new AccountDialogEditUserForm());
  }
}
