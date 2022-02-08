import { UserRole } from '@shared/user';

export class AccountDialogEditUserForm {
  public name: string;
  public email: string;
  public roleID: UserRole;
  public isNotSendEmail: boolean;
  public customerIDs: Array<number>;

  constructor() {
    this.name = '';
    this.email = '';
    this.roleID = UserRole.CUSTOMER;
    this.isNotSendEmail = false;
    this.customerIDs = [];
  }
}
