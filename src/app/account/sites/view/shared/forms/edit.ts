export class AccountSiteViewEditForm {
  public name: string;
  public uprn: string;
  public address: string;
  public postalCode: string;
  public city: string;
  public county: string;
  public customerName: string;
  public primaryContactID: number | undefined;

  constructor() {
    this.name = '';
    this.uprn = '';
    this.address = '';
    this.postalCode = '';
    this.city = '';
    this.county = '';
    this.customerName = '';
    this.primaryContactID = undefined;
  }
}
