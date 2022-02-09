import { JobStage } from '@shared/job';
import { box, Boxed } from 'ngrx-forms';

export class AccountJobsFilterForm {
  public jobID: number | undefined;
  public orderNo: string;
  public siteUprn: string;
  public siteName: string;
  public postalCode: string;
  public costCenterName: Boxed<Array<string>>;
  public stage: Boxed<Array<JobStage>>;
  public appointmentFrom: string;
  public appointmentTo: string;
  public startTimeFrom: string;
  public startTimeTo: string;

  constructor() {
    this.jobID = undefined;
    this.orderNo = '';
    this.siteUprn = '';
    this.siteName = '';
    this.postalCode = '';
    this.costCenterName = box([]);
    this.stage = box([]);
    this.appointmentFrom = '';
    this.appointmentTo = '';
    this.startTimeFrom = '';
    this.startTimeTo = '';
  }
}
