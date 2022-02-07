import { SiteSortField } from '@shared/site';

export class AccountSitesQueryParameters {
  public page: number;
  public perPage: number;
  public orderBy: SiteSortField;
  public desc: boolean;
  public customerID: number | undefined;
  public name: string;
  public uprn: string;
  public query: string;
  public postalCode: string;
  public primaryContactQuery: string;
  public hasOpenJobs: boolean | undefined;

  constructor(model: Partial<AccountSitesQueryParameters> = {}) {
    Object.assign(this, model);
  }
}
