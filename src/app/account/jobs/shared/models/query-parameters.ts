import { JobSortField, JobStage, JobStatus } from '@shared/job';

export class AccountJobsQueryParameters {
  public page: number;
  public perPage: number;
  public orderBy: JobSortField;
  public desc: boolean;
  public jobID: number | undefined;
  public simproCustomerID: number;
  public simproSiteID: number;
  public postalCode: string;
  public costCenterName: Array<string>;
  public stage: Array<JobStage>;
  public jobStatus: Array<JobStatus>;
  public appointmentFrom: string;
  public appointmentTo: string;
  public startTimeFrom: string;
  public startTimeTo: string;

  constructor(model: Partial<AccountJobsQueryParameters> = {}) {
    Object.assign(this, model);
  }
}
