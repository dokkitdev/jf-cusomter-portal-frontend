import { AssetTest } from '@shared/asset';
import { AssetTestSortField } from './enums';

export class AccountAssetTestsComponentState {
  public items: Array<AssetTest>;
  public orderBy: AssetTestSortField;
  public desc: boolean;

  constructor() {
    this.items = [];
    this.orderBy = AssetTestSortField.ENGINEER_NAME;
    this.desc = false;
  }
}
