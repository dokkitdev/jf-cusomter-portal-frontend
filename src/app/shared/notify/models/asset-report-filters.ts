import { Expose } from 'class-transformer';

export class AssetReportFilters {
  @Expose({ name: 'site_ids' })
  public siteIds: number[];

  @Expose({ name: 'service_level_names' })
  public serviceLevelNames: string[];

  @Expose({ name: 'asset_types' })
  public assetTypes: string[];

  @Expose({ name: 'job_stages' })
  public jobStages: string[];

  @Expose({ name: 'error_types' })
  public errorTypes: string[];

  constructor(data: Partial<AssetReportFilters> = {}) {
    this.siteIds = data.siteIds || [];
    this.serviceLevelNames = data.serviceLevelNames || [];
    this.assetTypes = data.assetTypes || [];
    this.jobStages = data.jobStages || [];
    this.errorTypes = data.errorTypes || [];
  }
}
