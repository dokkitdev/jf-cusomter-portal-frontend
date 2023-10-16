import { JobSortField } from '@shared/job';

export class AccountReportsKPIQueryParameters {
  public page: number;
  public perPage: number;
  public orderBy: JobSortField;
  public desc: boolean;
  public uprn: string;
  public costCenterName: Array<string>;
  public archived: boolean | undefined;
  public dateCreatedFrom: string;
  public dateCreatedTo: string;
  public safeTimeFrom: string;
  public safeTimeTo: string;

  constructor(model: Partial<AccountReportsKPIQueryParameters> = {}) {
    Object.assign(this, model);
  }
}
