import { ClassGroup } from '@shared/class-group';
import { Job } from '@shared/job';
import { Expose, Transform, Type } from 'class-transformer';
import { DateTime } from 'luxon';
import { AssetTestResult } from '../enums';
import { AssetReading } from './reading';

export class AssetTest {
  @Expose({ groups: [ClassGroup.MAIN] })
  public id: number;

  @Expose({ name: 'name', groups: [ClassGroup.MAIN] })
  public engineerName: string;

  @Expose({ name: 'job_id', groups: [ClassGroup.MAIN] })
  public jobID: number;

  @Expose({ groups: [ClassGroup.MAIN] })
  public notes: string;

  @Expose({ groups: [ClassGroup.MAIN] })
  public result: AssetTestResult;

  @Type(() => AssetReading)
  @Expose({ name: 'asset_test_record_readings', groups: [ClassGroup.MAIN] })
  public readings: Array<AssetReading>;

  @Type(() => Job)
  @Expose({ groups: [ClassGroup.MAIN] })
  public job?: Job;

  @Transform(({ value }) => (value ? DateTime.fromISO(value) : value), {
    toClassOnly: true
  })
  @Expose({ name: 'test_date', groups: [ClassGroup.MAIN] })
  public testDate: DateTime;

  constructor(model: Partial<AssetTest> = {}) {
    Object.assign(this, model);
  }
}
