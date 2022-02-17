import { ClassGroup } from '@shared/class-group';
import { Expose } from 'class-transformer';

export class AssetServiceLevel {
  @Expose({ name: 'ID', groups: [ClassGroup.MAIN] })
  public id: number;

  @Expose({ name: 'Name', groups: [ClassGroup.MAIN] })
  public name: string;

  constructor(model: Partial<AssetServiceLevel> = {}) {
    Object.assign(this, model);
  }
}
