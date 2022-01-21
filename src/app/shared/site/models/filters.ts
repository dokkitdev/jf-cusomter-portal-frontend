export class SiteFilters {
  public query?: string;
  public name?: string;
  public siteID?: number;
  public simproCustomerID?: number;
  public postalCode?: string;
  public primaryContactQuery?: string;
  public hasOpenJobs?: boolean;

  constructor(model: Partial<SiteFilters> = {}) {
    Object.assign(this, model);
  }
}
