import { Asset, AssetRelationType } from '@shared/asset';

export class AccountAssetsViewPageState {
  public isLoading: boolean;
  public asset: Asset;
  public relations: Array<AssetRelationType>;

  constructor() {
    this.isLoading = false;
    this.asset = new Asset();
    this.relations = [
      'site',
      'site.customer',
      'asset_attachments',
      'asset_custom_fields',
      'asset_test_records.job',
      'asset_test_records.asset_test_record_readings'
    ];
  }
}
