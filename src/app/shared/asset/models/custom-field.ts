import { ClassGroup } from '@shared/class-group';
import { Expose, Transform } from 'class-transformer';

export class AssetCustomField {
  @Expose({ groups: [ClassGroup.MAIN] })
  public id: number;

  @Expose({ groups: [ClassGroup.MAIN] })
  @Transform(({ value }) => (value) ? value : null, { toPlainOnly: true })
  public name: string;

  @Expose({ groups: [ClassGroup.MAIN] })
  @Transform(({ value }) => (value) ? value : null, { toPlainOnly: true })
  public value: string;

  @Expose({ name: 'simpro_custom_field_id', groups: [ClassGroup.MAIN] })
  public customFieldID: number;

  @Expose({ name: 'asset_id', groups: [ClassGroup.MAIN] })
  public assetID: number;

  constructor(model: Partial<AssetCustomField> = {}) {
    Object.assign(this, model);
  }
}
