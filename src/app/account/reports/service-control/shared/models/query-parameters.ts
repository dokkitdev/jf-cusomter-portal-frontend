import { AssetSortField } from '@shared/asset';

export class AccountReportsServiceControlQueryParameters {
  public page: number;
  public perPage: number;
  public orderBy: AssetSortField;
  public desc: boolean;

  constructor(model: Partial<AccountReportsServiceControlQueryParameters> = {}) {
    Object.assign(this, model);
  }
}
