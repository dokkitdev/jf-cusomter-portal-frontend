import { Expose } from 'class-transformer';
import { PaginationRequest } from '@shared/pagination';
import { UserSortField } from '../enums';
import { UserRelationType } from '../types';

export class UserPaginationRequest extends PaginationRequest {
  @Expose({ name: 'order_by' })
  public orderBy?: UserSortField;

  @Expose({ name: 'with' })
  public relations?: Array<UserRelationType>;

  @Expose({ name: 'name_query' })
  public name?: string;

  @Expose({ name: 'email_query' })
  public email?: string;

  @Expose({ name: 'simpro_customer_id' })
  public simproCustomerID?: number;

  constructor(model: Partial<UserPaginationRequest> = {}) {
    super(model);

    Object.assign(this, model);
  }
}
