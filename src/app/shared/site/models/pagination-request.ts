import { Expose, Transform } from 'class-transformer';
import { PaginationRequest } from '@shared/pagination';
import { SiteSortField } from '../enums';
import { SiteRelationType, SiteCountRelationType } from '../types';

export class SitePaginationRequest extends PaginationRequest {
  @Expose({ name: 'order_by' })
  public orderBy?: SiteSortField;

  @Expose({ name: 'with' })
  public relations?: Array<SiteRelationType>;

  @Expose({ name: 'with_count' })
  public countRelations?: Array<SiteCountRelationType>;

  @Expose({ name: 'name_query' })
  @Transform(({ value }) => value || undefined)
  public name?: string;

  @Expose({ name: 'site_id' })
  public siteID?: number;

  @Expose({ name: 'simpro_customer_id' })
  public simproCustomerID?: number;

  @Expose({ name: 'postal_code' })
  public postalCode?: string;

  @Expose({ name: 'primary_contact_query' })
  public primaryContactQuery?: string;

  @Expose({ name: 'has_open_jobs' })
  public hasOpenJobs?: boolean;

  constructor(model: Partial<SitePaginationRequest> = {}) {
    super(model);

    Object.assign(this, model);
  }
}
