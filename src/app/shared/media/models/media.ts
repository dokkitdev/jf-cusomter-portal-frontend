import { Expose, Transform, Type } from 'class-transformer';
import { ClassGroup } from '@shared/class-group';

export class Media {
  @Type(() => Number)
  @Expose({ groups: [ClassGroup.MAIN] })
  public id: number;

  @Expose({ groups: [ClassGroup.MAIN] })
  public name: string;

  @Expose({ groups: [ClassGroup.MAIN] })
  public link: string;

  @Type(() => Object)
  @Transform(({ obj }) => obj.file)
  @Expose({ groups: [ClassGroup.MAIN, ClassGroup.UPDATING, ClassGroup.CREATING] })
  public file: File;

  constructor(model: Partial<Media> = {}) {
    Object.assign(this, model);
  }
}
