import { ClassGroup } from '@shared/class-group';
import { Expose, Transform } from 'class-transformer';
import { DateTime } from 'luxon';

export class ParsingLog {
  @Expose()
  public id: number;

  @Expose({ name: 'parsing_type' })
  public parsingType: string;

  // TODO: Remove this once the API is updated
  @Transform(({ value }) => (value ? DateTime.fromISO(value.replace('p', 'Z')) : value), {
    toClassOnly: true
  })
  @Expose({ name: 'parsing_date', groups: [ClassGroup.MAIN] })
  public parsingDate: Date;

  @Expose({ name: 'total_count' })
  public totalCount: number;

  @Expose({ name: 'success_count' })
  public successCount: number;

  @Expose()
  public ids: Array<number>;

  @Expose({ name: 'error_reasons' })
  public errorReasons: Array<string>;

  // TODO: Remove this once the API is updated
  @Transform(({ value }) => (value ? DateTime.fromISO(value.replace('p', 'Z')) : value), {
    toClassOnly: true
  })
  @Expose({ name: 'created_at', groups: [ClassGroup.MAIN] })
  public createdAt: Date;

  constructor(model: Partial<ParsingLog> = {}) {
    Object.assign(this, model);
  }
}
