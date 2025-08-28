import { Expose, Transform } from 'class-transformer';

export class SystemLog {
  @Expose()
  public id: number;

  @Expose({ name: 'report_type' })
  public reportType: string;

  @Expose({ name: 'letters_generated' })
  public lettersGenerated: number;

  @Expose({ name: 'is_finished' })
  public isFinished: boolean;

  @Expose({ name: 'created_at' })
  @Transform(({ value }) => new Date(value))
  public createdAt: Date;

  @Expose({ name: 'updated_at' })
  @Transform(({ value }) => new Date(value))
  public updatedAt: Date;

  constructor(model: Partial<SystemLog> = {}) {
    Object.assign(this, model);
  }
}
