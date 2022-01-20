import { UserSortField } from '@shared/user';

export class AccountAdminUsersQueryParameters {
  public page: number;
  public perPage: number;
  public orderBy: UserSortField;
  public desc: boolean;
  public name: string;
  public email: string;
  public simproCustomerID: number | undefined;

  constructor(model: Partial<AccountAdminUsersQueryParameters> = {}) {
    Object.assign(this, model);
  }
}
