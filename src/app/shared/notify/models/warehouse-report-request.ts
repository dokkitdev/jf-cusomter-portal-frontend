import { Expose } from 'class-transformer';

export class WarehouseReportRequest {
  @Expose({ name: 'days_count' })
  public daysCount: string;

  constructor(daysCount: number) {
    // Ensure the value is within valid range
    if (daysCount <= 0 || daysCount >= 5) {
      throw new Error('Period must be greater than 0 and less than 5');
    }
    this.daysCount = daysCount.toString();
  }
}
