import { ReportSortField, ReportType } from '@shared/report';

export class AccountReportsQueryParameters {
  public page: number;
  public perPage: number;
  public orderBy: ReportSortField;
  public desc: boolean;
  public title: string;
  public type: Array<ReportType>;
  public createdAt: string;

  constructor(model: Partial<AccountReportsQueryParameters> = {}) {
    Object.assign(this, model);
  }
}
