import { AssetServiceLevel } from '@shared/asset';

export class AccountAssetServiceLevelMultiselectComponentState {
  public items: Array<AssetServiceLevel>;
  public isLoading: boolean;

  constructor() {
    this.items = [];
    this.isLoading = false;
  }
}
