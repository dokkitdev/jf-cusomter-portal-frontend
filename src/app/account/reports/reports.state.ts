import { Report, ReportRelationType, ReportSortField } from '@shared/report';
import { createFormGroupState, FormGroupState } from 'ngrx-forms';
import { AccountReportsFilterForm } from './shared/forms';

export class AccountReportsPageState {
  public isLoading: boolean;
  public items: Array<Report>;
  public totalItems: number;
  public page: number;
  public perPage: number;
  public orderBy: ReportSortField;
  public relations: Array<ReportRelationType>;
  public desc: boolean;
  public filterFormState: FormGroupState<AccountReportsFilterForm>;
  public readonly paginationId: string;

  constructor() {
    this.isLoading = false;
    this.items = [];
    this.totalItems = 0;
    this.page = 1;
    this.perPage = 10;
    this.orderBy = ReportSortField.FILENAME;
    this.relations = ['media'];
    this.desc = false;
    this.filterFormState = createFormGroupState('AccountReportsFilterForm', new AccountReportsFilterForm());
    this.paginationId = 'account-reports-pagination';
  }
}
