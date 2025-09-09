import { GeneralReportsSortField } from './general-reports-sort-field';

export class AccountReportsGeneralQueryParameters {
  public page: number;
  public perPage: number;
  public orderBy: GeneralReportsSortField;
  public desc: boolean;

  constructor({
    page = 1,
    perPage = 15,
    orderBy = GeneralReportsSortField.CREATED_AT,
    desc = true
  }: {
    page?: number;
    perPage?: number;
    orderBy?: GeneralReportsSortField;
    desc?: boolean;
  } = {}) {
    this.page = page;
    this.perPage = perPage;
    this.orderBy = orderBy;
    this.desc = desc;
  }
}
