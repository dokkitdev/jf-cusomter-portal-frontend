export class AccountDialogEditUserForm {
  public name: string;
  public email: string;
  public isSendEmail: boolean;

  constructor() {
    this.name = '';
    this.email = '';
    this.isSendEmail = false;
  }
}
