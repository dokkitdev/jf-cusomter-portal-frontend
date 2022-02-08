import { JobStatus } from '@shared/job';

export class AccountJobStatusMultiselectComponentState {
  public items: Array<JobStatus>;
  public isLoading: boolean;

  constructor() {
    this.items = [];
    this.isLoading = false;
  }
}
