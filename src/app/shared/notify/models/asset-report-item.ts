import { Expose } from 'class-transformer';

export class AssetReportItem {
  @Expose()
  public id: number;

  @Expose()
  public siteId: number;

  @Expose()
  public assetId: number;

  @Expose()
  public uprn: string;

  @Expose()
  public assetType: string;

  @Expose()
  public serviceLevelName: string | null;

  @Expose()
  public jobStage: string | null;

  @Expose()
  public errorType: string;

  @Expose()
  public errorText: string;

  @Expose()
  public createdAt: string;

  @Expose()
  public updatedAt: string;
}
