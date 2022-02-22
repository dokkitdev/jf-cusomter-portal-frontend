import { ClassGroup } from '@shared/class-group';
import { Customer } from '@shared/customer';
import { JobSchedule } from './schedule';
import { Site } from '@shared/site';
import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { DateTime } from 'luxon';
import { JobAttachment } from './attachment';
import { JobCatalog } from './catalog';
import { JobWorkOrder } from './work-order';
import { JobStage } from '../enums';
import { NoAccessDate } from './no-access-date';

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
  public status: string;

  @Expose({ groups: [ClassGroup.MAIN] })
  public priority: string;

  @Expose({ name: 'site_id', groups: [ClassGroup.MAIN] })
  public siteID: number;

  @Expose({ groups: [ClassGroup.MAIN] })
  public stage: JobStage;

  @Expose({ name: 'customer_id', groups: [ClassGroup.MAIN] })
  public customerID: number;

  @Expose({ name: 'recent_schedule_id', groups: [ClassGroup.MAIN] })
  public recentScheduleID: number;

  @Expose({ name: 'job_attachments_count', groups: [ClassGroup.MAIN] })
  public attachmentsCount: number;

  @Expose({ name: 'order_no', groups: [ClassGroup.MAIN] })
  public orderNo: string;

  @Transform(({ value }) => (value) ? DateTime.fromISO(value) : value, { toClassOnly: true })
  @Expose({ name: 'date_created', groups: [ClassGroup.MAIN] })
  public dateCreated: DateTime;

  @Transform(({ value }) => (value) ? DateTime.fromISO(value) : value, { toClassOnly: true })
  @Expose({ name: 'completion_date', groups: [ClassGroup.MAIN] })
  public completionDate: DateTime;

  @Transform(({ value }) => (value) ? DateTime.fromSQL(value) : value, { toClassOnly: true })
  @Expose({ name: 'due_date', groups: [ClassGroup.MAIN] })
  public dueDate: DateTime;

  @Transform(({ value }) => (value) ? DateTime.fromSQL(value) : value, { toClassOnly: true })
  @Expose({ name: 'made_safe_date', groups: [ClassGroup.MAIN] })
  public madeSafeDate: DateTime;

  @Transform(({ value }) => (value) ? DateTime.fromSQL(value) : value, { toClassOnly: true })
  @Expose({ name: 'requested', groups: [ClassGroup.MAIN] })
  public requestedDate: DateTime;

  @Transform(({ value }) => (value) ? DateTime.fromISO(value) : value, { toClassOnly: true })
  @Expose({ name: 'created_at', groups: [ClassGroup.MAIN] })
  public createdAt: DateTime;

  @Type(() => Customer)
  @Expose({ groups: [ClassGroup.MAIN] })
  public customer?: Customer;

  @Type(() => Site)
  @Expose({ groups: [ClassGroup.MAIN] })
  public site?: Site;

  @Type(() => JobSchedule)
  @Expose({ name: 'recent_schedule', groups: [ClassGroup.MAIN] })
  public recentSchedule?: JobSchedule;

  @Type(() => JobSchedule)
  @Expose({ name: 'next_schedule', groups: [ClassGroup.MAIN] })
  public nextSchedule?: JobSchedule;

  @Type(() => JobSchedule)
  @Expose({ groups: [ClassGroup.MAIN] })
  public schedules?: Array<JobSchedule>;

  @Type(() => JobAttachment)
  @Expose({ name: 'job_attachments', groups: [ClassGroup.MAIN] })
  public attachments: Array<JobAttachment>;

  @Type(() => JobCatalog)
  @Expose({ name: 'job_catalogs', groups: [ClassGroup.MAIN] })
  public catalogs: Array<JobCatalog>;

  @Type(() => JobWorkOrder)
  @Expose({ name: 'job_work_orders', groups: [ClassGroup.MAIN] })
  public workOrders: Array<JobWorkOrder>;

  @Type(() => NoAccessDate)
  @Expose({ name: 'job_no_access_dates', groups: [ClassGroup.MAIN] })
  public noAccessDates?: Array<NoAccessDate>;

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

  @Exclude()
  public get isPending(): boolean {
    return this.stage === JobStage.PENDING;
  }
}
