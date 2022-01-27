import { SiteContactSortField } from '../enums';

export class AccountSiteContactsQueryParameters {
  public orderBy: SiteContactSortField;
  public desc: boolean;

  constructor(model: Partial<AccountSiteContactsQueryParameters> = {}) {
    Object.assign(this, model);
  }
}
