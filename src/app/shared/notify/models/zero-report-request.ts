import { Expose, Transform } from 'class-transformer';
import { ClassGroup } from '@shared/class-group';

export class ZeroReportRequest {
  @Expose({ name: 'date_from', groups: [ClassGroup.MAIN] })
  @Transform(({ value }) => {
    if (!value) return '';
    // If it's already in YYYY-MM-DD format, return as is
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      return value;
    }
    // If it's a full datetime, extract just the date part
    const date = new Date(value);
    return date.toISOString().split('T')[0];
  })
  public dateFrom: string;

  @Expose({ name: 'date_to', groups: [ClassGroup.MAIN] })
  @Transform(({ value }) => {
    if (!value) return '';
    // If it's already in YYYY-MM-DD format, return as is
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      return value;
    }
    // If it's a full datetime, extract just the date part
    const date = new Date(value);
    return date.toISOString().split('T')[0];
  })
  public dateTo: string;

  constructor(dateFrom: string, dateTo: string) {
    this.dateFrom = dateFrom;
    this.dateTo = dateTo;
  }
}
