import { CustomerSortField } from '@shared/customer';

export class CustomerQueryParameters {
  public page: number;
  public perPage: number;
  public orderBy: CustomerSortField;
  public desc: boolean;

  constructor(model: Partial<CustomerQueryParameters> = {}) {
    Object.assign(this, model);
  }
}
