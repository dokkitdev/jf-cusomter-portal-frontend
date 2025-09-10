import { Expose, Transform } from 'class-transformer';

export class AssetReportItem {
  @Expose()
  public id: number;

  @Expose({ name: 'site_id' })
  public siteId: number;

  @Expose({ name: 'asset_id' })
  public assetId: number;

  @Expose()
  public uprn: string;

  @Expose({ name: 'asset_type' })
  public assetType: string;

  @Expose({ name: 'service_level_name' })
  public serviceLevelName: string | null;

  @Expose({ name: 'job_stage' })
  public jobStage: string | null;

  @Expose({ name: 'error_type' })
  public errorType: string;

  @Expose({ name: 'error_text' })
  public errorText: string;

  @Expose({ name: 'created_at' })
  public createdAt: string;

  @Expose({ name: 'updated_at' })
  public updatedAt: string;
}
