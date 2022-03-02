import { AssetCp12Status, AssetSortField } from '@shared/asset';
import { JobStage } from '@shared/job';

export class AccountReportsServiceControlQueryParameters {
  public page: number;
  public perPage: number;
  public orderBy: AssetSortField;
  public desc: boolean;
  public siteID: number;
  public jobStage: Array<JobStage>;
  public jobDueDateFrom: string;
  public jobDueDateTo: string;
  public jobLoggedCompletionDateFrom: string;
  public jobLoggedCompletionDateTo: string;
  public CP12Status: string | undefined;
  public customAssetTypeValue: string;

  constructor(model: Partial<AccountReportsServiceControlQueryParameters> = {}) {
    Object.assign(this, model);
  }
}
