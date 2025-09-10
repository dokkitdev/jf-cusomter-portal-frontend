import { Expose, Type } from 'class-transformer';
import { AssetReportItem } from './asset-report-item';

export class AssetReportResponse {
  @Expose()
  @Type(() => AssetReportItem)
  public data: AssetReportItem[];

  @Expose()
  public currentPage: number;

  @Expose()
  public firstPageUrl: string;

  @Expose()
  public from: number;

  @Expose()
  public lastPage: number;

  @Expose()
  public lastPageUrl: string;

  @Expose()
  public nextPageUrl: string | null;

  @Expose()
  public path: string;

  @Expose()
  public perPage: number;

  @Expose()
  public prevPageUrl: string | null;

  @Expose()
  public to: number;

  @Expose()
  public total: number;
}
