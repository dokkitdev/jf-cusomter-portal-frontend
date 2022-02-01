import { Contact } from '@shared/contact';

export class AccountDialogEditContactData {
  public isEditMode: boolean;
  public contact: Contact;
  public siteID?: number;

  constructor(model: Partial<AccountDialogEditContactData> = {}) {
    Object.assign(this, model);
  }
}
