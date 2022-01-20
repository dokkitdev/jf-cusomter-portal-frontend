import { Expose } from 'class-transformer';
import { PaginationRequest } from '@shared/pagination';
import { CustomerSortField } from '../enums';

export class CustomerPaginationRequest extends PaginationRequest {
  @Expose({ name: 'order_by' })
  public orderBy?: CustomerSortField;

  constructor(model: Partial<CustomerPaginationRequest> = {}) {
    super(model);

    Object.assign(this, model);
  }
}
