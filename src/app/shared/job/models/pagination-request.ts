
import { Expose } from 'class-transformer';
import { PaginationRequest } from '@shared/pagination';
import { JobSortField, JobStage } from '../enums';
import { JobRelationType } from '../types';

export class JobPaginationRequest extends PaginationRequest {
  @Expose({ name: 'order_by' })
  public orderBy?: JobSortField;

  @Expose({ name: 'with' })
  public relations?: Array<JobRelationType>;

  @Expose({ name: 'job_id' })
  public jobID?: number;

  @Expose({ name: 'customer_name' })
  public customerName?: string;

  @Expose({ name: 'site_name' })
  public siteName?: string;

  @Expose({ name: 'simpro_customer_id' })
  public simproCustomerID?: number;

  @Expose({ name: 'simpro_site_id' })
  public simproSiteID?: number;

  @Expose({ name: 'postal_code' })
  public postalCode?: string;

  @Expose()
  public priority?: Array<string>;

  @Expose({ name: 'cost_center_name' })
  public costCenterName?: Array<string>;

  @Expose()
  public stage?: Array<JobStage>;

  @Expose({ name: 'job_status' })
  public jobStatus?: Array<string>;

  @Expose()
  public requested?: boolean;

  @Expose({ name: 'appointment_from' })
  public appointmentFrom?: string;

  @Expose({ name: 'appointment_to' })
  public appointmentTo?: string;

  @Expose({ name: 'start_time_from' })
  public startTimeFrom?: string;

  @Expose({ name: 'start_time_to' })
  public startTimeTo?: string;

  @Expose({ name: 'end_time_from' })
  public endTimeFrom?: string;

  @Expose({ name: 'end_time_to' })
  public endTimeTo?: string;

  constructor(model: Partial<JobPaginationRequest> = {}) {
    super(model);

    Object.assign(this, model);
  }
}
