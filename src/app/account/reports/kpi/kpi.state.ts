import { Job, JobRelationType, JobSortField } from '@shared/job';
import { createFormGroupState, FormGroupState } from 'ngrx-forms';
import { AccountReportsKPIFilterForm } from './shared/forms';

export class AccountReportsKPIPageState {
  public isLoading: boolean;
  public items: Array<Job>;
  public totalItems: number;
  public page: number;
  public perPage: number;
  public orderBy: JobSortField;
  public desc: boolean;
  public relations: Array<JobRelationType>;
  public filterFormState: FormGroupState<AccountReportsKPIFilterForm>;
  public readonly paginationID: string;

  constructor() {
    this.isLoading = false;
    this.items = [];
    this.totalItems = 0;
    this.page = 1;
    this.perPage = 15;
    this.orderBy = JobSortField.JOB_ID;
    this.desc = true;
    this.relations = ['site'];
    this.filterFormState = createFormGroupState('AccountReportsKPIFilterForm', new AccountReportsKPIFilterForm());
    this.paginationID = 'account-reports-kpi-pagination';
  }
}
