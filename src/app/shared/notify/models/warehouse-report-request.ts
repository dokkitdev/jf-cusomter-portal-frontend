import { Expose } from 'class-transformer';

export class WarehouseReportRequest {
  @Expose({ name: 'days_count' })
  public daysCount: string;

  constructor(daysCount: number) {
    this.daysCount = daysCount.toString();
  }
}
