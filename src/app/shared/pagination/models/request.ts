import { Expose, Transform } from 'class-transformer';

export class PaginationRequest {
  @Expose()
  @Transform(({ value }) => value || undefined)
  public query?: string;

  @Expose()
  public page?: number;

  @Expose({ name: 'per_page' })
  public perPage?: number;

  @Expose()
  public all?: boolean;

  @Expose({ name: 'order_by' })
  public orderBy?: string;

  @Expose()
  public desc?: boolean;

  @Expose({ name: 'with', toPlainOnly: true })
  public relations?: Array<string>;

  @Expose({ name: 'with_count', toPlainOnly: true })
  public countRelations?: Array<string>;

  constructor(model: Partial<PaginationRequest> = {}) {
    Object.assign(this, model);
  }
}
