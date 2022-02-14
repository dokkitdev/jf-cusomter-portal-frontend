import { JobCatalog } from '@shared/job';

export class AccountJobsViewSorsComponentState {
  public catalogs: Array<JobCatalog>;
  public isCollapsed: boolean;
  public minVisibleItems: number;

  constructor() {
    this.catalogs = [];
    this.isCollapsed = true;
    this.minVisibleItems = 5;
  }
}
