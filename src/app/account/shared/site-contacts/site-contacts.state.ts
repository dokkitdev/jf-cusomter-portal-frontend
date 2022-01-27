import { Contact } from '@shared/contact';
import { SiteContactSortField } from './enums';

export class AccountSiteContactsComponentState {
  public siteID: number | undefined;
  public items: Array<Contact>;
  public orderBy: SiteContactSortField;
  public desc: boolean;

  constructor() {
    this.siteID = undefined;
    this.items = [];
    this.orderBy = SiteContactSortField.NAME;
    this.desc = false;
  }
}
