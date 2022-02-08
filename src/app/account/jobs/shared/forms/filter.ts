import { JobStage } from '@shared/job';
import { box, Boxed } from 'ngrx-forms';

export class AccountJobsFilterForm {
  public jobID: number | undefined;
  public simproCustomerID: number;
  public simproSiteID: number;
  public postalCode: string;
  public costCenterName: Boxed<Array<string>>;
  public stage: Boxed<Array<JobStage>>;
  public jobStatus: Boxed<Array<string>>;
  public appointmentFrom: string;
  public appointmentTo: string;
  public startTimeFrom: string;
  public startTimeTo: string;

  constructor() {
    this.jobID = undefined;
    this.simproCustomerID = 0;
    this.simproSiteID = 0;
    this.postalCode = '';
    this.costCenterName = box([]);
    this.stage = box([]);
    this.jobStatus = box([]);
    this.appointmentFrom = '';
    this.appointmentTo = '';
    this.startTimeFrom = '';
    this.startTimeTo = '';
  }
}
