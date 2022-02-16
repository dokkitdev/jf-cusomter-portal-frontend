import { Asset } from '@shared/asset';

export class AccountReportsServiceControlState {
  public items: Array<Asset>;
  public isLoading: boolean;
  public readonly paginationId: string;

  constructor() {
    this.items = [];
    this.isLoading = false;
    this.paginationId = 'account-reports-service-control-pagination';
  }
}
