import { ClassGroup } from '@shared/class-group';
import { Customer } from '@shared/customer';
import { JobSchedule } from './schedule';
import { Site } from '@shared/site';
import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { DateTime } from 'luxon';
import { JobAttachment } from './attachment';
import { JobStage } from '../enums';

export class Job {
  @Expose({ groups: [ClassGroup.MAIN] })
  public id: number;

  @Expose({ groups: [ClassGroup.MAIN] })
  public title: string;

  @Expose({ groups: [ClassGroup.MAIN] })
  public name: string;

  @Expose({ name: 'cost_center_name', groups: [ClassGroup.MAIN] })
  public costCenterName: string;

  @Expose({ groups: [ClassGroup.MAIN] })
  public description: string;

  @Expose({ name: 'simpro_job_id', groups: [ClassGroup.MAIN] })
  public jobID: number;

  @Expose({ name: 'job_status', groups: [ClassGroup.MAIN] })
  public jobStatus: string;

  @Expose({ groups: [ClassGroup.MAIN] })
  public priority: string;

  @Expose({ name: 'simpro_site_id', groups: [ClassGroup.MAIN] })
  public simproSiteID: number;

  @Expose({ groups: [ClassGroup.MAIN] })
  public stage: JobStage;

  @Expose({ name: 'simpro_customer_id', groups: [ClassGroup.MAIN] })
  public simproCustomerID: number;

  @Expose({ name: 'recent_schedule_id', groups: [ClassGroup.MAIN] })
  public recentScheduleID: number;

  @Transform(({ value }) => (value) ? DateTime.fromISO(value) : value, { toClassOnly: true })
  @Expose({ groups: [ClassGroup.MAIN] })
  public requested: DateTime;

  @Transform(({ value }) => (value) ? DateTime.fromISO(value) : value, { toClassOnly: true })
  @Expose({ name: 'date_created', groups: [ClassGroup.MAIN] })
  public dateCreated: DateTime;

  @Transform(({ value }) => (value) ? DateTime.fromISO(value) : value, { toClassOnly: true })
  @Expose({ name: 'created_at', groups: [ClassGroup.MAIN] })
  public createdAt: DateTime;

  @Type(() => Customer)
  @Expose({ name: 'simpro_customer', groups: [ClassGroup.MAIN] })
  public simproCustomer?: Customer;

  @Type(() => Site)
  @Expose({ name: 'simpro_site', groups: [ClassGroup.MAIN] })
  public simproSite?: Site;

  @Type(() => JobSchedule)
  @Expose({ name: 'recent_schedule', groups: [ClassGroup.MAIN] })
  public recentSchedule?: JobSchedule;

  @Type(() => JobSchedule)
  @Expose({ groups: [ClassGroup.MAIN] })
  public schedules?: Array<JobSchedule>;

  @Type(() => JobAttachment)
  @Expose({ name: 'job_attachments', groups: [ClassGroup.MAIN] })
  public attachments?: Array<JobAttachment>;

  constructor(model: Partial<Job> = {}) {
    Object.assign(this, model);
  }

  @Exclude()
  public get isArchived(): boolean {
    return this.stage === JobStage.ARCHIVED;
  }

  @Exclude()
  public get isCompleted(): boolean {
    return this.stage === JobStage.COMPLETE;
  }

  @Exclude()
  public get isInProgress(): boolean {
    return this.stage === JobStage.PROGRESS;
  }
}
