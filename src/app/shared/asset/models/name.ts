import { ClassGroup } from '@shared/class-group';
import { Expose } from 'class-transformer';

export class AssetName {
  @Expose({ name: 'ID', groups: [ClassGroup.MAIN] })
  public id: number;

  @Expose({ name: 'Name', groups: [ClassGroup.MAIN] })
  public name: string;

  constructor(model: Partial<AssetName> = {}) {
    Object.assign(this, model);
  }
}
