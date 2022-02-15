import { ClassGroup } from '@shared/class-group';
import { Expose } from 'class-transformer';

export class AssetReading {
  @Expose({ groups: [ClassGroup.MAIN] })
  public id: number;

  @Expose({ groups: [ClassGroup.MAIN] })
  public name: string;

  @Expose({ groups: [ClassGroup.MAIN] })
  public value: string;

  constructor(model: Partial<AssetReading> = {}) {
    Object.assign(this, model);
  }
}
