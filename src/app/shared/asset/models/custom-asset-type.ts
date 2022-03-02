import { Expose } from 'class-transformer';

export class CustomAssetType {
  @Expose({ name: 'ID' })
  public id: number;

  @Expose({ name: 'Name' })
  public name: string;

  constructor(assetType: Partial<CustomAssetType> = {}) {
    Object.assign(this, assetType);
  }
}
