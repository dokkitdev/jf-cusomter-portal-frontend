import { AssetReading } from '@shared/asset';

export class AccountDialogViewAssetTestReadingsData {
  public readings: Array<AssetReading>;

  constructor(model: Partial<AccountDialogViewAssetTestReadingsData> = {}) {
    Object.assign(this, model);
  }
}
