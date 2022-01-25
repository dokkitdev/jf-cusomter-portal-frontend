export class AccountSitesFilterForm {
  public simproCustomerID: number | undefined;
  public name: string;
  public uprn: string;
  public query: string;
  public postalCode: string;
  public primaryContactQuery: string;
  public hasOpenJobs: boolean | undefined;

  constructor() {
    this.simproCustomerID = undefined;
    this.name = '';
    this.uprn = '';
    this.query = '';
    this.postalCode = '';
    this.primaryContactQuery = '';
    this.hasOpenJobs = undefined;
  }
}
