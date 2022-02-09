import { JobSortField, JobStage } from '@shared/job';

export class AccountJobsQueryParameters {
  public page: number;
  public perPage: number;
  public orderBy: JobSortField;
  public desc: boolean;
  public jobID: number | undefined;
  public orderNo: string;
  public siteUprn: string;
  public siteName: string;
  public postalCode: string;
  public costCenterName: Array<string>;
  public stage: Array<JobStage>;
  public appointmentFrom: string;
  public appointmentTo: string;
  public startTimeFrom: string;
  public startTimeTo: string;

  constructor(model: Partial<AccountJobsQueryParameters> = {}) {
    Object.assign(this, model);
  }
}
