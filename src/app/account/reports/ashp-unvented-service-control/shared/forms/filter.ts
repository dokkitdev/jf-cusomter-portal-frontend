import { AssetCp12Status } from '@shared/asset';
import { JobStage } from '@shared/job';
import { box, Boxed } from 'ngrx-forms';

export class AccountReportsServiceControlFilterForm {
  public siteID: number;
  public jobStage: Boxed<Array<JobStage>>;
  public jobDueDateFrom: string;
  public jobDueDateTo: string;
  public jobFrom: string;
  public jobLoggedCompletionDateFrom: string;
  public jobLoggedCompletionDateTo: string;
  public CP12Status: AssetCp12Status | undefined;
  public customAssetTypeValue: Boxed<Array<string>>;

  constructor() {
    this.siteID = 0;
    this.jobStage = box([]);
    this.jobDueDateFrom = '';
    this.jobDueDateTo = '';
    this.jobLoggedCompletionDateFrom = '';
    this.jobLoggedCompletionDateTo = '';
    this.CP12Status = undefined;
    this.customAssetTypeValue = box([]);
  }
}
