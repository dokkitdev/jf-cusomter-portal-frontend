export class AssetReportQueryParams {
  public all?: boolean;
  public page?: number;
  public perPage?: number;
  public orderBy?: string;
  public desc?: boolean;
  public siteId?: number;
  public serviceLevelNames?: string[];
  public assetTypes?: string[];
  public jobStages?: string[];
  public errorTypes?: string[];

  constructor(data: Partial<AssetReportQueryParams> = {}) {
    this.all = data.all;
    this.page = data.page;
    this.perPage = data.perPage;
    this.orderBy = data.orderBy;
    this.desc = data.desc;
    this.siteId = data.siteId;
    this.serviceLevelNames = data.serviceLevelNames || [];
    this.assetTypes = data.assetTypes || [];
    this.jobStages = data.jobStages || [];
    this.errorTypes = data.errorTypes || [];
  }
}
