export class AccountDialogEditUserForm {
  public name: string;
  public email: string;
  public isSendEmail: boolean;
  public customerIDs: Array<number>;

  constructor() {
    this.name = '';
    this.email = '';
    this.isSendEmail = false;
    this.customerIDs = [];
  }
}
