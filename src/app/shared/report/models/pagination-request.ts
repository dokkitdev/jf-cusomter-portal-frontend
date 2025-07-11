import { Expose } from 'class-transformer';
import { PaginationRequest } from '@shared/pagination';
import { ReportSortField } from '../enums';
import { ReportRelationType } from '../types';

export class ReportPaginationRequest extends PaginationRequest {
  @Expose({ name: 'order_by' })
  public orderBy?: ReportSortField;

  @Expose({ name: 'with' })
  public relations?: Array<ReportRelationType>;

  @Expose({ name: 'title_query' })
  public title?: string;

  @Expose({ name: 'created_at_from' })
  public createdAtFrom?: string;

  @Expose({ name: 'created_at_to' })
  public createdAtTo?: string;

  constructor(model: Partial<ReportPaginationRequest> = {}) {
    super(model);

    Object.assign(this, model);
  }
}
