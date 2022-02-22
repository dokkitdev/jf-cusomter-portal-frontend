import { ClassGroup } from '@shared/class-group';
import { Expose, Transform } from 'class-transformer';
import { DateTime } from 'luxon';

export class NoAccessDate {
  @Expose({ groups: [ClassGroup.MAIN] })
  public id: number;

  @Expose({ name: 'job_id', groups: [ClassGroup.MAIN] })
  public jobId: number;

  @Transform(({ value }) => (value) ? DateTime.fromSQL(value) : value, { toClassOnly: true })
  @Expose({ groups: [ClassGroup.MAIN] })
  public date: number;

  constructor(date: Partial<NoAccessDate> = {}) {
    Object.assign(this, date);
  }
}
