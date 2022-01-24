import { Customer } from '@shared/customer';
import { User, UserRelationType, UserSortField } from '@shared/user';
import { createFormGroupState, FormGroupState } from 'ngrx-forms';
import { AccountAdminUsersFilterForm } from './shared/forms';

export class AccountAdminUsersPageState {
  public isLoading: boolean;
  public isLoadingToPage: boolean;
  public items: Array<User>;
  public totalItems: number;
  public page: number;
  public perPage: number;
  public orderBy: UserSortField;
  public relations: Array<UserRelationType>;
  public desc: boolean;
  public filterFormState: FormGroupState<AccountAdminUsersFilterForm>;
  public selectedCustomer: Customer | undefined;

  constructor() {
    this.isLoading = false;
    this.isLoadingToPage = false;
    this.items = [];
    this.totalItems = 0;
    this.page = 1;
    this.perPage = 15;
    this.orderBy = UserSortField.NAME;
    // this.relations = ['groups.simpro_customer'];
    this.desc = false;
    this.filterFormState = createFormGroupState('AccountAdminUsersFilterForm', new AccountAdminUsersFilterForm());
    this.selectedCustomer = undefined;
  }
}
