export class SiteFilters {
  public query?: string;
  public name?: string;
  public uprn?: string;
  public siteID?: number;
  public customerIds?: Array<number>;
  public postalCode?: string;
  public primaryContactQuery?: string;
  public hasOpenJobs?: boolean;

  constructor(model: Partial<SiteFilters> = {}) {
    Object.assign(this, model);
  }
}
