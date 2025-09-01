import { configuration } from '@configurations';
import { Expose, Transform } from 'class-transformer';
import { DateTime } from 'luxon';

export class ZeroReportRequest {
  @Expose({ name: 'date_from' })
  @Transform(
    ({ value }) => (value ? DateTime.fromISO(value).toFormat(configuration.dateFormats.reports.zeroDate) : value)
  )
  public dateFrom: string;

  @Expose({ name: 'date_to' })
  @Transform(
    ({ value }) => (value ? DateTime.fromISO(value).toFormat(configuration.dateFormats.reports.zeroDate) : value)
  )
  public dateTo: string;

  constructor(model: Partial<ZeroReportRequest> = {}) {
    Object.assign(this, model);
  }
}
