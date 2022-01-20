import { UserInvoicePermissionLevel, UserQuotePermissionLevel } from '@shared/user';

export class AccountDialogEditUserForm {
  public name: string;
  public email: string;
  public invoicePermissionLevel?: UserInvoicePermissionLevel;
  public quotePermissionLevel?: UserQuotePermissionLevel;
  public isSendEmail: boolean;
  public isQuoteRequests: boolean;
  public isJobRequests: boolean;
  public groupIDs: Array<number>;

  constructor() {
    this.name = '';
    this.email = '';
    this.invoicePermissionLevel = undefined;
    this.quotePermissionLevel = undefined;
    this.isSendEmail = false;
    this.isQuoteRequests = false;
    this.isJobRequests = false;
    this.groupIDs = [];
  }
}
