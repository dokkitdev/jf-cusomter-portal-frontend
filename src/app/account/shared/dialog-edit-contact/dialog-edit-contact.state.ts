import { Contact } from '@shared/contact';
import { createFormGroupState, FormGroupState } from 'ngrx-forms';
import { AccountDialogEditContactForm } from './forms';

export class AccountDialogEditContactComponentState {
  public isSendingRequest: boolean;
  public isEditMode: boolean;
  public siteID: number | undefined;
  public contact: Contact;
  public formState: FormGroupState<AccountDialogEditContactForm>;

  constructor() {
    this.isSendingRequest = false;
    this.isEditMode = false;
    this.siteID = undefined;
    this.contact = new Contact();
    this.formState = createFormGroupState('AccountDialogEditContactForm', new AccountDialogEditContactForm());
  }
}
