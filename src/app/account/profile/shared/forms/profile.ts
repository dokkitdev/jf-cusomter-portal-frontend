export class AccountProfilePageForm {
  public oldPassword: string;
  public password: string;
  public passwordConfirmation: string;
  public email: string;
  public name: string;
  public shouldValidatePassword: boolean;

  constructor() {
    this.oldPassword = '';
    this.password = '';
    this.passwordConfirmation = '';
    this.email = '';
    this.name = '';
    this.shouldValidatePassword = false;
  }
}
