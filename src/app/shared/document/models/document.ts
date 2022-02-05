import { ClassGroup } from '@shared/class-group';
import { Media } from '@shared/media';
import { Expose, Transform, Type } from 'class-transformer';
import { DateTime } from 'luxon';

export class Document {
  @Expose({ groups: [ClassGroup.MAIN] })
  public id: number;

  @Expose({ groups: [ClassGroup.MAIN, ClassGroup.CREATING, ClassGroup.UPDATING] })
  public title: string;

  @Expose({ groups: [ClassGroup.MAIN, ClassGroup.CREATING, ClassGroup.UPDATING] })
  public description: string;

  @Expose({ name: 'media_id', groups: [ClassGroup.MAIN, ClassGroup.CREATING, ClassGroup.UPDATING] })
  public mediaID: number;

  @Type(() => Media)
  @Expose({ groups: [ClassGroup.MAIN] })
  public media?: Media;

  @Transform(({ value }) => (value) ? DateTime.fromISO(value) : value, { toClassOnly: true })
  @Expose({ name: 'created_at', groups: [ClassGroup.MAIN] })
  public createdAt: DateTime;

  constructor(model: Partial<Document> = {}) {
    Object.assign(this, model);
  }
}
