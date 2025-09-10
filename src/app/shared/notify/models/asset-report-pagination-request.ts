import { Expose } from 'class-transformer';
import { PaginationRequest } from '@shared/pagination';

export class AssetReportPaginationRequest extends PaginationRequest {
  @Expose({ name: 'site_id' })
  public siteId?: number;

  @Expose({ name: 'service_level_names' })
  public serviceLevelNames?: string[];

  @Expose({ name: 'asset_types' })
  public assetTypes?: string[];

  @Expose({ name: 'job_stages' })
  public jobStages?: string[];

  @Expose({ name: 'error_types' })
  public errorTypes?: string[];

  constructor(data: Partial<AssetReportPaginationRequest> = {}) {
    super(data);
    this.siteId = data.siteId;
    this.serviceLevelNames = data.serviceLevelNames || [];
    this.assetTypes = data.assetTypes || [];
    this.jobStages = data.jobStages || [];
    this.errorTypes = data.errorTypes || [];
  }
}
