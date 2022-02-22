import { Asset, AssetFilters, AssetSortField, AssetRelationType } from '@shared/asset';

export class AccountReportsServiceControlState {
  public items: Array<Asset>;
  public isLoading: boolean;
  public page: number;
  public orderBy: AssetSortField;
  public desc: boolean;
  public perPage: number;
  public filters: AssetFilters;
  public relations: Array<AssetRelationType>;
  public paginationId: string;

  constructor() {
    this.items = [];
    this.isLoading = false;
    this.page = 1;
    this.orderBy = AssetSortField.NAME;
    this.desc = true;
    this.perPage = 10;
    this.filters = new AssetFilters({ assetType: 4 });
    this.relations = [
      'site',
      'site.primary_site_contact',
      'asset_test_record',
      'asset_test_record.job',
      'asset_test_record.job.job_no_access_dates',
      'asset_test_record.job.next_schedule'
    ];
    this.paginationId = 'account-reports-service-control-pagination';
  }
}
