import { Expose, Transform } from 'class-transformer';

export class ParsingLog {
  @Expose()
  public id: number;

  @Expose({ name: 'parsing_type' })
  public parsingType: string;

  @Expose({ name: 'parsing_date' })
  @Transform(({ value }) => new Date(value))
  public parsingDate: Date;

  @Expose({ name: 'total_count' })
  public totalCount: number;

  @Expose({ name: 'success_count' })
  public successCount: number;

  @Expose()
  public ids: Array<number>;

  @Expose({ name: 'error_reasons' })
  public errorReasons: Array<string>;

  @Expose({ name: 'created_at' })
  @Transform(({ value }) => new Date(value))
  public createdAt: Date;

  @Expose({ name: 'updated_at' })
  @Transform(({ value }) => new Date(value))
  public updatedAt: Date;

  constructor(model: Partial<ParsingLog> = {}) {
    Object.assign(this, model);
  }
}
