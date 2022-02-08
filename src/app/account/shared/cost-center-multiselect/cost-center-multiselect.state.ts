import { JobCostCenter } from '@shared/job';

export class AccountCostCenterMultiselectComponentState {
  public items: Array<JobCostCenter>;
  public isLoading: boolean;

  constructor() {
    this.items = [];
    this.isLoading = false;
  }
}
