import { ClassGroup } from '@shared/class-group';
import { Expose, Transform } from 'class-transformer';
import { DateTime } from 'luxon';

export class JobWorkOrder {
  @Expose({ groups: [ClassGroup.MAIN] })
  public id: number;

  @Expose({ groups: [ClassGroup.MAIN] })
  public name: string;

  @Expose({ groups: [ClassGroup.MAIN] })
  public description: string;

  @Expose({ name: 'job_id', groups: [ClassGroup.MAIN] })
  public jobID: number;

  @Transform(({ value }) => (value ? DateTime.fromISO(value) : value), {
    toClassOnly: true
  })
  @Expose({ groups: [ClassGroup.MAIN] })
  public date: DateTime;

  constructor(model: Partial<JobWorkOrder> = {}) {
    Object.assign(this, model);
  }
}
