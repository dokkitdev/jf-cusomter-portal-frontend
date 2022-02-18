import { AssetTestSortField } from '../enums';

export class AccountAssetTestsQueryParameters {
  public orderBy: AssetTestSortField;
  public desc: boolean;

  constructor(model: Partial<AccountAssetTestsQueryParameters> = {}) {
    Object.assign(this, model);
  }
}
