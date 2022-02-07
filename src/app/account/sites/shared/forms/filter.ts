export class AccountSitesFilterForm {
  public customerID: number | undefined;
  public name: string;
  public uprn: string;
  public query: string;
  public postalCode: string;
  public primaryContactQuery: string;
  public hasOpenJobs: boolean | undefined;

  constructor() {
    this.customerID = undefined;
    this.name = '';
    this.uprn = '';
    this.query = '';
    this.postalCode = '';
    this.primaryContactQuery = '';
    this.hasOpenJobs = undefined;
  }
}
