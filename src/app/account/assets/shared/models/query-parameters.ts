import { AssetSortField } from '@shared/asset';

export class AccountAssetsQueryParameters {
  public page: number;
  public perPage: number;
  public orderBy: AssetSortField;
  public desc: boolean;
  public assetID: number | undefined;
  public simproCustomerID: number | undefined;
  public siteUprn: string;
  public siteName: string;
  public query: string;
  public location: string;
  public make: string;
  public model: string;
  public archived: boolean | undefined;
  public lastTestResult: string | undefined;
  public serviceLevelNames: Array<string>;
  public lastTestDateFrom: string;
  public lastTestDateTo: string;
  public nextServiceDateFrom: string;
  public nextServiceDateTo: string;

  constructor(model: Partial<AccountAssetsQueryParameters> = {}) {
    Object.assign(this, model);
  }
}
