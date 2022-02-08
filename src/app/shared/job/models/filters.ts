import { JobStage } from '../enums';

export class JobFilters {
  public jobID?: number;
  public customerName?: string;
  public siteName?: string;
  public simproCustomerID?: number;
  public simproSiteID?: number;
  public postalCode?: string;
  public priority?: Array<string>;
  public costCenterName?: Array<string>;
  public stage?: Array<JobStage>;
  public jobStatus?: Array<string>;
  public requested?: boolean;
  public appointmentFrom?: string;
  public appointmentTo?: string;
  public startTimeFrom?: string;
  public startTimeTo?: string;
  public endTimeFrom?: string;
  public endTimeTo?: string;

  constructor(model: Partial<JobFilters> = {}) {
    Object.assign(this, model);
  }
}
