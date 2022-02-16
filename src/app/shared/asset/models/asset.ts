import { ClassGroup } from '@shared/class-group';
import { Expose, Transform } from 'class-transformer';
import { DateTime } from 'luxon';
import { AssetTestResult } from '../enums';

export class Asset {
  @Expose({ groups: [ClassGroup.MAIN] })
  public id: number;

  @Expose({ groups: [ClassGroup.MAIN] })
  public name: string;

  @Expose({ groups: [ClassGroup.MAIN] })
  public location: string;

  @Expose({ name: 'simpro_asset_id', groups: [ClassGroup.MAIN] })
  public assetID: number;

  @Expose({ name: 'last_test_result', groups: [ClassGroup.MAIN] })
  public lastTestResult: AssetTestResult;

  @Expose({ name: 'service_level_name', groups: [ClassGroup.MAIN] })
  public serviceLevelName: string;

  @Expose({ name: 'archived', groups: [ClassGroup.MAIN] })
  public isArchived: boolean;

  @Transform(({ value }) => (value) ? DateTime.fromISO(value) : value, { toClassOnly: true })
  @Expose({ name: 'last_test_date', groups: [ClassGroup.MAIN] })
  public lastTestDate: DateTime;

  @Transform(({ value }) => (value) ? DateTime.fromISO(value) : value, { toClassOnly: true })
  @Expose({ name: 'next_service_date', groups: [ClassGroup.MAIN] })
  public nextServiceDate: DateTime;

  constructor(model: Partial<Asset> = {}) {
    Object.assign(this, model);
  }
}
