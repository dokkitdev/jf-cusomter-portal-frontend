import { AssetName } from '@shared/asset';

export class AccountAssetNameMultiselectComponentState {
  public items: Array<AssetName>;
  public isLoading: boolean;

  constructor() {
    this.items = [];
    this.isLoading = false;
  }
}
