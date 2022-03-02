import { AssetCp12Status } from './../enums/cp12-status';
import { Expose } from 'class-transformer';
import { PaginationRequest } from '@shared/pagination';
import { AssetSortField, AssetTestResult } from '../enums';
import { AssetRelationType } from '../types';
import { JobStage } from '@shared/job';

export class AssetPaginationRequest extends PaginationRequest {
  @Expose({ name: 'order_by' })
  public orderBy?: AssetSortField;

  @Expose({ name: 'with' })
  public relations?: Array<AssetRelationType>;

  @Expose({ name: 'simpro_asset_id' })
  public assetID?: number;

  @Expose({ name: 'asset_type' })
  public assetType?: number;

  @Expose({ name: 'customer_id' })
  public simproCustomerID?: number;

  @Expose({ name: 'site_id' })
  public siteID?: number;

  @Expose({ name: 'site_uprn_query' })
  public siteUprn?: string;

  @Expose({ name: 'site_name_query' })
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

  @Expose({ name: 'job_stage' })
  public jobStage: Array<JobStage>;

  @Expose({ name: 'job_due_date_from' })
  public jobDueDateFrom?: string;

  @Expose({ name: 'job_due_date_to' })
  public jobDueDateTo?: string;

  @Expose({ name: 'job_logged_completion_date_from' })
  public jobLoggedCompletionDateFrom?: string;

  @Expose({ name: 'job_logged_completion_date_to' })
  public jobLoggedCompletionDateTo?: string;

  @Expose({ name: 'cp12_status' })
  public CP12Status?: AssetCp12Status;

  @Expose({ name: 'custom_asset_type_value' })
  public customAssetTypeValue: string;

  @Expose()
  public report?: boolean;

  constructor(model: Partial<AssetPaginationRequest> = {}) {
    super(model);

    Object.assign(this, model);
  }
}
