export class UserFilters {
  public name?: string;
  public email?: string;
  public customerIds?: Array<number>;

  constructor(model: Partial<UserFilters> = {}) {
    Object.assign(this, model);
  }
}
