import { Expose } from 'class-transformer';
import { PaginationRequest } from '@shared/pagination';
import { DocumentSortField } from '../enums';
import { DocumentRelationType } from '../types';

export class DocumentPaginationRequest extends PaginationRequest {
  @Expose({ name: 'order_by' })
  public orderBy?: DocumentSortField;

  @Expose({ name: 'with' })
  public relations?: Array<DocumentRelationType>;

  @Expose({ name: 'title_query' })
  public title?: string;

  @Expose({ name: 'created_at_from' })
  public createdAtFrom?: string;

  @Expose({ name: 'created_at_to' })
  public createdAtTo?: string;

  constructor(model: Partial<DocumentPaginationRequest> = {}) {
    super(model);

    Object.assign(this, model);
  }
}
