import { Expose } from 'class-transformer';
import { PaginationRequest } from '@shared/pagination';
import { AssetSortField, AssetTestResult } from '../enums';
import { AssetRelationType } from '../types';

export class AssetPaginationRequest extends PaginationRequest {
  @Expose({ name: 'order_by' })
  public orderBy?: AssetSortField;

  @Expose({ name: 'with' })
  public relations?: Array<AssetRelationType>;

  @Expose({ name: 'simpro_asset_id' })
  public assetID?: number;

  @Expose({ name: 'customer_id' })
  public simproCustomerID?: number;

  @Expose({ name: 'uprn_query' })
  public uprn?: string;

  @Expose({ name: 'site_name' })
  public siteName?: string;

  @Expose({ name: 'name_query' })
  public name?: string;

  @Expose({ name: 'location_query' })
  public location?: string;

  @Expose({ name: 'make_query' })
  public make?: string;

  @Expose({ name: 'model_query' })
  public model?: string;

  @Expose()
  public archived?: boolean;

  @Expose({ name: 'last_test_result_query' })
  public lastTestResult?: AssetTestResult;

  @Expose({ name: 'service_level_names' })
  public serviceLevelNames?: Array<string>;

  @Expose({ name: 'last_test_date_from' })
  public lastTestDateFrom?: string;

  @Expose({ name: 'last_test_date_to' })
  public lastTestDateTo?: string;

  @Expose({ name: 'next_service_date_from' })
  public nextServiceDateFrom?: string;

  @Expose({ name: 'next_service_date_to' })
  public nextServiceDateTo?: string;

  constructor(model: Partial<AssetPaginationRequest> = {}) {
    super(model);

    Object.assign(this, model);
  }
}
