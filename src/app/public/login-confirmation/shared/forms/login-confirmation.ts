export class PublicLoginConfirmationPageForm {
  public email: string;
  public code: string;
  public password: string;

  constructor() {
    this.email = '';
    this.code = '';
    this.password = '';
  }
}
