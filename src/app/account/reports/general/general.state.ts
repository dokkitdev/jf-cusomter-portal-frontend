import { CsvReport } from '@shared/notify';
import { GeneralReportsSortField } from './shared/types/general-reports-sort-field';

export class AccountReportsGeneralPageState {
  public items: Array<CsvReport> = [];
  public isLoading: boolean = false;
  public page: number = 1;
  public perPage: number = 15;
  public totalPages: number = 0;
  public totalItems: number = 0;
  public paginationID: string = 'account-reports-general-pagination';
  public orderBy: GeneralReportsSortField = GeneralReportsSortField.CREATED_AT;
  public desc: boolean = true;

  constructor() {}
}
