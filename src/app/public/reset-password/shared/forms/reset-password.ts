export class PublicResetPasswordPageForm {
  public password: string;
  public confirmPassword: string;

  constructor() {
    this.password = '';
    this.confirmPassword = '';
  }
}
