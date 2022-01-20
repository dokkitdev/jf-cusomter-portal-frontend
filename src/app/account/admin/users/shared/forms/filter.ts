export class AccountAdminUsersFilterForm {
  public simproCustomerID: number | undefined;
  public name: string;
  public email: string;

  constructor() {
    this.simproCustomerID = undefined;
    this.name = '';
    this.email = '';
  }
}
