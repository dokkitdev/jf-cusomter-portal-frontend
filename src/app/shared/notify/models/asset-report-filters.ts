import { Expose } from 'class-transformer';

export class AssetReportFilters {
  @Expose({ name: 'site_ids' })
  public siteIds: Array<number>;

  @Expose({ name: 'service_level_names' })
  public serviceLevelNames: Array<string>;

  @Expose({ name: 'asset_types' })
  public assetTypes: Array<string>;

  @Expose({ name: 'job_stages' })
  public jobStages: Array<string>;

  @Expose({ name: 'error_types' })
  public errorTypes: Array<string>;

  constructor(data: Partial<AssetReportFilters> = {}) {
    this.siteIds = data.siteIds || [];
    this.serviceLevelNames = data.serviceLevelNames || [];
    this.assetTypes = data.assetTypes || [];
    this.jobStages = data.jobStages || [];
    this.errorTypes = data.errorTypes || [];
  }
}
