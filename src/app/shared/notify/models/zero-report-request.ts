import { Expose, Transform } from 'class-transformer';
import { DateTime } from 'luxon';
import { ClassGroup } from '@shared/class-group';

export class ZeroReportRequest {
  @Expose({ name: 'date_from', groups: [ClassGroup.MAIN] })
  @Transform(({ value }) => (value ? DateTime.fromISO(value).toISODate() : ''))
  public dateFrom: string;

  @Expose({ name: 'date_to', groups: [ClassGroup.MAIN] })
  @Transform(({ value }) => (value ? DateTime.fromISO(value).toISODate() : ''))
  public dateTo: string;

  constructor(dateFrom: string, dateTo: string) {
    this.dateFrom = dateFrom;
    this.dateTo = dateTo;
  }
}
