import { JobStage } from '@shared/job';
import { box, Boxed } from 'ngrx-forms';

export class AccountJobsFilterForm {
  public jobID: number | undefined;
  public siteID: number | undefined;
  public orderNo: string;
  public uprn: string;
  public siteName: string;
  public postalCode: string;
  public costCenterName: Boxed<Array<string>>;
  public stage: Boxed<Array<JobStage>>;
  public appointmentFrom: string;
  public appointmentTo: string;
  public startTimeFrom: string;
  public startTimeTo: string;
  public dateCreated: string;

  constructor() {
    this.jobID = undefined;
    this.siteID = undefined;
    this.orderNo = '';
    this.uprn = '';
    this.siteName = '';
    this.postalCode = '';
    this.costCenterName = box([]);
    this.stage = box([]);
    this.appointmentFrom = '';
    this.appointmentTo = '';
    this.startTimeFrom = '';
    this.startTimeTo = '';
    this.dateCreated = '';
  }
}
