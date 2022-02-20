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
    this.page = 0;
    this.orderBy = AssetSortField.NAME;
    this.desc = true;
    this.perPage = 10;
    this.filters = new AssetFilters();
    this.relations = [];
    this.paginationId = 'account-reports-service-control-pagination';
  }
}
