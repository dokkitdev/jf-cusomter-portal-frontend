import { ClassGroup } from '@shared/class-group';
import { Expose, Transform } from 'class-transformer';
import { DateTime } from 'luxon';

export class SystemLog {
  @Expose()
  public id: number;

  @Expose({ name: 'report_type' })
  public reportType: string;

  @Expose({ name: 'letters_generated' })
  public lettersGenerated: number;

  @Expose({ name: 'email_generated' })
  public emailGenerated: number;

  @Expose({ name: 'is_finished' })
  public isFinished: boolean;

  // TODO: Remove this once the API is updated
  @Transform(({ value }) => (value ? DateTime.fromISO(value.replace('p', 'Z')) : value), {
    toClassOnly: true
  })
  @Expose({ name: 'created_at', groups: [ClassGroup.MAIN] })
  public createdAt: Date;

  constructor(model: Partial<SystemLog> = {}) {
    Object.assign(this, model);
  }
}
