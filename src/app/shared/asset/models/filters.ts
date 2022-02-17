import { AssetTestResult } from '../enums';

export class AssetFilters {
  public assetID?: number;
  public simproCustomerID?: number;
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

  constructor(model: Partial<AssetFilters> = {}) {
    Object.assign(this, model);
  }
}
