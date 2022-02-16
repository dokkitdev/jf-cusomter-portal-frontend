export class AssetFilters {
  public assetID?: number;
  public parentID?: number;
  public simproSiteID?: number;
  public simproCustomerID?: number;
  public query?: string;
  public location?: string;
  public archived?: boolean;
  public serviceLevelNames?: Array<string>;
  public lastTestDateFrom?: string;
  public lastTestDateTo?: string;
  public nextServiceDateFrom?: string;
  public nextServiceDateTo?: string;

  constructor(model: Partial<AssetFilters> = {}) {
    Object.assign(this, model);
  }
}
