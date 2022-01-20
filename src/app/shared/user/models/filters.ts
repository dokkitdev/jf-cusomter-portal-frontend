export class UserFilters {
  public name?: string;
  public email?: string;
  public simproCustomerID?: number;

  constructor(model: Partial<UserFilters> = {}) {
    Object.assign(this, model);
  }
}
