import { Asset, AssetSortField } from '@shared/asset';

export class AccountReportsServiceControlState {
  public items: Array<Asset>;
  public isLoading: boolean;
  public page: number;
  public orderBy: AssetSortField;
  public desc: boolean;
  public perPage: number;
  public paginationId: string;

  constructor() {
    this.items = [];
    this.isLoading = false;
    this.page = 0;
    this.orderBy = AssetSortField.NAME;
    this.desc = true;
    this.perPage = 10;
    this.paginationId = 'account-reports-service-control-pagination';
  }
}
