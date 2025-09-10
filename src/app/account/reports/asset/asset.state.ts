import { FormGroupState, Boxed, box } from 'ngrx-forms';
import { AssetReportItem } from '@shared/notify';
import { AssetReportSortField } from '@shared/notify/types';

export interface AssetReportFormFilters {
  siteId: number | null;
  serviceLevelNames: Boxed<Array<string>>;
  assetTypes: Boxed<Array<string>>;
  errorTypes: Boxed<Array<string>>;
  jobStages: Boxed<Array<string>>;
}

export interface AccountReportsAssetPageState {
  items: Array<AssetReportItem>;
  isLoading: boolean;
  isGeneratingReport: boolean;
  page: number;
  totalPages: number;
  totalItems: number;
  perPage: number;
  orderBy: AssetReportSortField;
  desc: boolean;
  paginationID: string;
  filters: AssetReportFormFilters;
  formState: FormGroupState<AssetReportFormFilters>;
  availableFilters: {
    siteIds: Array<number>;
    serviceLevelNames: Array<string>;
    assetTypes: Array<string>;
    errorTypes: Array<string>;
    jobStages: Array<string>;
  };
}

export class AccountReportsAssetPageStateImpl {
  public items: Array<AssetReportItem> = [];
  public isLoading: boolean = false;
  public isGeneratingReport: boolean = false;
  public page: number = 1;
  public totalPages: number = 0;
  public totalItems: number = 0;
  public perPage: number = 20;
  public orderBy: AssetReportSortField = AssetReportSortField.SITE_ID;
  public desc: boolean = false;
  public paginationID: string = 'account-reports-asset-pagination';
  public filters: AssetReportFormFilters = {
    siteId: null,
    serviceLevelNames: box([]),
    assetTypes: box([]),
    errorTypes: box([]),
    jobStages: box([])
  };
  public formState: FormGroupState<AssetReportFormFilters> = null as any;
  public availableFilters: {
    siteIds: Array<number>;
    serviceLevelNames: Array<string>;
    assetTypes: Array<string>;
    errorTypes: Array<string>;
    jobStages: Array<string>;
  } = {
    siteIds: [],
    serviceLevelNames: [],
    assetTypes: [],
    errorTypes: [],
    jobStages: []
  };
}
