import { Media } from '@shared/media';
import { createFormGroupState, FormGroupState } from 'ngrx-forms';
import { AccountDialogJobRequestForm } from './forms';

export class AccountDialogJobRequestComponentState {
  public isSendingRequest: boolean;
  public siteID: number;
  public formState: FormGroupState<AccountDialogJobRequestForm>;
  public attachments: Array<Media>;

  constructor() {
    this.isSendingRequest = false;
    this.siteID = 0;
    this.formState = createFormGroupState('AccountDialogJobRequestForm', new AccountDialogJobRequestForm());
    this.attachments = [];
  }
}
