import { AssetCp12Status } from '@shared/asset';
import { JobStage } from '@shared/job';
import { box, Boxed } from 'ngrx-forms';

export class AccountReportsServiceControlFilterForm {
  public siteID: number;
  public jobStage: Boxed<JobStage | undefined>;
  public jobDueDateFrom: string;
  public jobDueDateTo: string;
  public jobFrom: string;
  public jobLoggedCompletionDateFrom: string;
  public jobLoggedCompletionDateTo: string;
  public CP12Status: Boxed<AssetCp12Status | undefined>;
  public customAssetTypeValue: string;

  constructor() {
    this.siteID = 0;
    this.jobStage = box(undefined);
    this.jobDueDateFrom = '';
    this.jobDueDateTo = '';
    this.jobLoggedCompletionDateFrom = '';
    this.jobLoggedCompletionDateTo = '';
    this.CP12Status = box(undefined);
    this.customAssetTypeValue = '';
  }
}
