import { Customer } from '@shared/customer';
import { Job, JobRelationType, JobSortField } from '@shared/job';
import { Site } from '@shared/site';
import { createFormGroupState, FormGroupState } from 'ngrx-forms';
import { AccountJobsFilterForm } from './shared/forms';

export class AccountJobsPageState {
  public isLoading: boolean;
  public isLoadingToPage: boolean;
  public items: Array<Job>;
  public totalItems: number;
  public page: number;
  public perPage: number;
  public orderBy: JobSortField;
  public relations: Array<JobRelationType>;
  public desc: boolean;
  public filterFormState: FormGroupState<AccountJobsFilterForm>;
  public selectedCustomer: Customer | undefined;
  public selectedSite: Site | undefined;

  constructor() {
    this.isLoading = false;
    this.isLoadingToPage = false;
    this.items = [];
    this.totalItems = 0;
    this.page = 1;
    this.perPage = 10;
    this.orderBy = JobSortField.JOB_ID;
    this.relations = ['site', 'customer', 'recent_schedule'];
    this.desc = true;
    this.filterFormState = createFormGroupState('AccountJobsFilterForm', new AccountJobsFilterForm());
    this.selectedCustomer = undefined;
    this.selectedSite = undefined;
  }
}
