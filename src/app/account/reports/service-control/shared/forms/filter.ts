import { JobStage } from '@shared/job';
import { box, Boxed } from 'ngrx-forms';

export class AccountReportsServiceControlFilterForm {
  public siteID: number;
  public jobStage: Boxed<JobStage | undefined>;
  public jobDueDateFrom: string;
  public jobDueDateTo: string;

  constructor() {
    this.siteID = 0;
    this.jobStage = box(undefined);
    this.jobDueDateFrom = '';
    this.jobDueDateTo = '';
  }
}
