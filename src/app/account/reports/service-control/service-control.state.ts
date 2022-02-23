import { AccountReportsServiceControlFilterForm } from './shared/forms/filter';
import { FormGroupState, createFormGroupState } from 'ngrx-forms';
import { Asset, AssetFilters, AssetSortField, AssetRelationType } from '@shared/asset';
import { Site } from '@shared/site';

export class AccountReportsServiceControlState {
  public items: Array<Asset>;
  public isLoading: boolean;
  public isExporting: boolean;
  public page: number;
  public orderBy: AssetSortField;
  public desc: boolean;
  public perPage: number;
  public totalItems: number;
  public relations: Array<AssetRelationType>;
  public paginationId: string;
  public filterFormState: FormGroupState<AccountReportsServiceControlFilterForm>;
  public selectedSite?: Site;

  constructor() {
    this.items = [];
    this.isLoading = false;
    this.isExporting = false;
    this.page = 1;
    this.orderBy = AssetSortField.NAME;
    this.desc = true;
    this.perPage = 10;
    this.totalItems = 0;
    this.relations = [
      'site',
      'site.primary_site_contact',
      'asset_test_record',
      'asset_test_record.job',
      'asset_test_record.job.customer',
      'asset_test_record.job.job_no_access_dates',
      'asset_test_record.job.next_schedule'
    ];
    this.paginationId = 'account-reports-service-control-pagination';
    this.filterFormState = createFormGroupState('AccountReportsServiceControlFilterForm', new AccountReportsServiceControlFilterForm());
    this.selectedSite = undefined;
  }
}
