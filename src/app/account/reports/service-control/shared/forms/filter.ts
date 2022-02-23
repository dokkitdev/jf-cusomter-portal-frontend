import { JobStage } from '@shared/job';

export class AccountReportsServiceControlFilterForm {
  public siteID: number;
  public jobStage: JobStage | undefined;

  constructor() {
    this.siteID = 0;
    this.jobStage = undefined;
  }
}
