import { Customer, CustomerFilters, CustomerSortField } from '@shared/customer';
import { createFormControlState, FormControlState } from 'ngrx-forms';

export class AccountCustomerSelectComponentState {
  public items: Array<Customer>;
  public totalItems: number;
  public isLoading: boolean;
  public page: number;
  public perPage: number;
  public orderBy: CustomerSortField;
  public desc: boolean;
  public filters: CustomerFilters;
  public controlState: FormControlState<number>;
  public excludeID: Array<number>;
  public idField: keyof Customer;

  constructor() {
    this.items = [];
    this.totalItems = 0;
    this.isLoading = false;
    this.page = 1;
    this.perPage = 10;
    this.orderBy = CustomerSortField.NAME;
    this.desc = false;
    this.filters = new CustomerFilters();
    this.controlState = createFormControlState('', 0);
    this.excludeID = [];
    this.idField = 'id';
  }
}
