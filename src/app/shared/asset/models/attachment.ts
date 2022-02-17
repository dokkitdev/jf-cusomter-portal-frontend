import { ClassGroup } from '@shared/class-group';
import { Expose } from 'class-transformer';

export class AssetAttachment {
  @Expose({ groups: [ClassGroup.MAIN] })
  public id: number;

  @Expose({ groups: [ClassGroup.MAIN] })
  public name: string;

  @Expose({ name: 'asset_id', groups: [ClassGroup.MAIN] })
  public assetID: number;

  @Expose({ name: 'simpro_attachment_id', groups: [ClassGroup.MAIN] })
  public attachmentID: string;

  constructor(model: Partial<AssetAttachment> = {}) {
    Object.assign(this, model);
  }
}
