import { ClassGroup } from '@shared/class-group';
import { Expose, Transform } from 'class-transformer';
import { DateTime } from 'luxon';

export class JobSchedule {
  @Expose({ groups: [ClassGroup.MAIN] })
  public id: number;

  @Expose({ groups: [ClassGroup.MAIN] })
  public name: string;

  @Expose({ name: 'job_id', groups: [ClassGroup.MAIN] })
  public jobID: number;

  @Expose({ name: 'schedule_id', groups: [ClassGroup.MAIN] })
  public scheduleID: number;

  @Transform(({ value }) => (value) ? DateTime.fromSQL(value) : value, { toClassOnly: true })
  @Expose({ name: 'start_time', groups: [ClassGroup.MAIN] })
  public startTime: DateTime;

  @Transform(({ value }) => (value) ? DateTime.fromSQL(value) : value, { toClassOnly: true })
  @Expose({ name: 'end_time', groups: [ClassGroup.MAIN] })
  public endTime: DateTime;

  @Transform(({ value }) => (value) ? DateTime.fromSQL(value) : value, { toClassOnly: true })
  @Expose({ groups: [ClassGroup.MAIN] })
  public date: DateTime;

  constructor(model: Partial<JobSchedule> = {}) {
    Object.assign(this, model);
  }
}
