export class CustomerFilters {
  public query?: string;

  constructor(model: Partial<CustomerFilters> = {}) {
    Object.assign(this, model);
  }
}
