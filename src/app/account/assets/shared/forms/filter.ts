import { AssetTestResult } from '@shared/asset';
import { box, Boxed } from 'ngrx-forms';

export class AccountAssetsFilterForm {
  public assetID: number | undefined;
  public simproCustomerID: number | undefined;
  public siteID: number | undefined;
  public siteUprn: string;
  public siteName: string;
  public query: string;
  public location: string;
  public make: string;
  public model: string;
  public archived: boolean | undefined;
  public lastTestResult: AssetTestResult | undefined;
  public lastTestDateFrom: string;
  public serviceLevelNames: Boxed<Array<string>>;
  public lastTestDateTo: string;
  public nextServiceDateFrom: string;
  public nextServiceDateTo: string;

  constructor() {
    this.assetID = undefined;
    this.simproCustomerID = undefined;
    this.siteID = undefined;
    this.siteUprn = '';
    this.siteName = '';
    this.query = '';
    this.location = '';
    this.make = '';
    this.model = '';
    this.archived = undefined;
    this.lastTestResult = undefined;
    this.serviceLevelNames = box([]);
    this.lastTestDateFrom = '';
    this.lastTestDateTo = '';
    this.nextServiceDateFrom = '';
    this.nextServiceDateTo = '';
  }
}
