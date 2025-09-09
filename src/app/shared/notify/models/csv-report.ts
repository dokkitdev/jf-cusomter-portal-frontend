import { Expose, Transform } from 'class-transformer';

export class CsvReport {
  @Expose()
  public id: number;

  @Expose({ name: 'report_type' })
  public reportType: string;

  @Expose({ name: 'file_name' })
  public fileName: string;

  @Expose({ name: 'is_finished' })
  public isFinished: boolean;

  @Expose({ name: 'created_at' })
  @Transform(({ value }) => (value ? new Date(value) : undefined))
  public createdAt: Date;

  @Expose({ name: 'updated_at' })
  @Transform(({ value }) => (value ? new Date(value) : undefined))
  public updatedAt: Date;

  constructor(model: Partial<CsvReport> = {}) {
    Object.assign(this, model);
  }
}
