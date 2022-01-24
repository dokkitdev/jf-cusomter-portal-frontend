import { Customer } from '@shared/customer';
import { Site, SiteCountRelationType, SiteRelationType, SiteSortField } from '@shared/site';
import { createFormGroupState, FormGroupState } from 'ngrx-forms';
import { AccountSitesFilterForm } from './shared/forms';

export class AccountSitesPageState {
  public isLoading: boolean;
  public isLoadingToPage: boolean;
  public items: Array<Site>;
  public totalItems: number;
  public page: number;
  public perPage: number;
  public orderBy: SiteSortField;
  public relations: Array<SiteRelationType>;
  public countRelations: Array<SiteCountRelationType>;
  public desc: boolean;
  public filterFormState: FormGroupState<AccountSitesFilterForm>;
  public selectedCustomer: Customer | undefined;

  constructor() {
    this.isLoading = false;
    this.isLoadingToPage = false;
    this.items = [];
    this.totalItems = 0;
    this.page = 1;
    this.perPage = 15;
    this.orderBy = SiteSortField.NAME;
    this.relations = ['customers', 'primary_site_contact'];
    this.countRelations = ['open_jobs'];
    this.desc = false;
    this.filterFormState = createFormGroupState('AccountSitesFilterForm', new AccountSitesFilterForm());
    this.selectedCustomer = undefined;
  }
}
