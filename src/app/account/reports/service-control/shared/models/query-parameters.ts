import { AssetSortField } from '@shared/asset';
import { JobStage } from '@shared/job';

export class AccountReportsServiceControlQueryParameters {
  public page: number;
  public perPage: number;
  public orderBy: AssetSortField;
  public desc: boolean;
  public siteID: number;
  public jobStage: JobStage | undefined;
  public jobDueDateFrom: string;
  public jobDueDateTo: string;
  public jobLoggedCompletionDateFrom: string;
  public jobLoggedCompletionDateTo: string;

  constructor(model: Partial<AccountReportsServiceControlQueryParameters> = {}) {
    Object.assign(this, model);
  }
}
