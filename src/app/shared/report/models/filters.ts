import { ReportType } from '@shared/report';

export class ReportFilters {
  public type?: Array<ReportType>;
  public title?: string;
  public createdAt?: string;

  constructor(model: Partial<ReportFilters> = {}) {
    Object.assign(this, model);
  }
}
