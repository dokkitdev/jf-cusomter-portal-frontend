import { CsvReport } from './shared/models/csv-report';

export class AccountReportsGeneralPageState {
  public items: Array<CsvReport> = [];
  public isLoading: boolean = false;
  public sortParameters: any = {};
  public page: number = 1;
  public perPage: number = 15;
  public totalPages: number = 0;
  public totalItems: number = 0;
  public paginationID: string = 'account-reports-general-pagination';

  constructor() {}
}
