import { SiteSortField } from '@shared/site';

export class SiteQueryParameters {
  public page: number;
  public perPage: number;
  public orderBy: SiteSortField;
  public desc: boolean;

  constructor(model: Partial<SiteQueryParameters> = {}) {
    Object.assign(this, model);
  }
}
