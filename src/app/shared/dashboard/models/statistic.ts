import { ClassGroup } from '@shared/class-group';
import { Expose } from 'class-transformer';

export class DashboardStatistic {
  @Expose({ name: 'archived_jobs_total', groups: [ClassGroup.MAIN] })
  public archivedJobsTotal: number;

  @Expose({ name: 'invoiced_jobs_total', groups: [ClassGroup.MAIN] })
  public invoicedJobsTotal: number;

  @Expose({ name: 'complete_jobs_total', groups: [ClassGroup.MAIN] })
  public completeJobsTotal: number;

  @Expose({ name: 'pending_jobs_total', groups: [ClassGroup.MAIN] })
  public pendingJobsTotal: number;

  @Expose({ name: 'progress_jobs_total', groups: [ClassGroup.MAIN] })
  public progressJobsTotal: number;

  @Expose({ name: 'out_of_hours_jobs_total', groups: [ClassGroup.MAIN] })
  public outOfHoursJobsTotal: number;

  @Expose({ name: 'todays_jobs_total', groups: [ClassGroup.MAIN] })
  public todaysJobsTotal: number;

  constructor(model: Partial<DashboardStatistic> = {}) {
    Object.assign(this, model);
  }
}
