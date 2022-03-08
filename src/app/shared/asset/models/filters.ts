import { AssetCp12Status } from './../enums/cp12-status';
import { JobStage } from '@shared/job';
import { AssetTestResult } from '../enums';

export class AssetFilters {
  public assetID?: number;
  public assetType?: number;
  public simproCustomerID?: number;
  public siteID?: number;
  public siteUprn?: string;
  public siteName?: string;
  public query?: string;
  public location?: string;
  public make?: string;
  public model?: string;
  public archived?: boolean;
  public lastTestResult?: AssetTestResult;
  public serviceLevelNames?: Array<string>;
  public lastTestDateFrom?: string;
  public lastTestDateTo?: string;
  public nextServiceDateFrom?: string;
  public nextServiceDateTo?: string;
  public jobStage?: Array<JobStage>;
  public jobDueDateFrom?: string;
  public jobDueDateTo?: string;
  public jobLoggedCompletionDateFrom?: string;
  public jobLoggedCompletionDateTo?: string;
  public CP12Status?: AssetCp12Status;
  public customAssetTypeValue?: Array<string>;
  public names?: Array<string>;
  public report?: boolean;

  constructor(model: Partial<AssetFilters> = {}) {
    Object.assign(this, model);
  }
}
