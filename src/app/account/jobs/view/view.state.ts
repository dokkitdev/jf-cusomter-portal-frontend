import { Job, JobRelationType } from '@shared/job';

export class AccountJobsViewPageState {
  public isLoading: boolean;
  public job: Job;
  public relations: Array<JobRelationType>;

  constructor() {
    this.isLoading = false;
    this.job = new Job();
    this.relations = ['site', 'customer', 'job_attachments', 'job_work_orders', 'schedules'];
  }
}
