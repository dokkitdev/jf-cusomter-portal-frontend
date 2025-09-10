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

export class AccountReportsAssetPageState {
  public isLoading: boolean;
  public isGeneratingReport: boolean;
  public items: Array<AssetReportItem>;
  public totalItems: number;
  public totalPages: number;
  public page: number;
  public perPage: number;
  public orderBy: AssetReportSortField;
  public desc: boolean;
  public filters: AssetReportFormFilters;
  public formState: FormGroupState<AssetReportFormFilters>;
  public availableFilters: {
    siteIds: Array<number>;
    serviceLevelNames: Array<string>;
    assetTypes: Array<string>;
    errorTypes: Array<string>;
    jobStages: Array<string>;
  };
  public readonly paginationID: string;

  constructor() {
    this.isLoading = false;
    this.isGeneratingReport = false;
    this.items = [];
    this.totalItems = 0;
    this.totalPages = 0;
    this.page = 1;
    this.perPage = 20;
    this.orderBy = AssetReportSortField.SITE_ID;
    this.desc = false;
    this.filters = {
      siteId: null,
      serviceLevelNames: box([]),
      assetTypes: box([]),
      errorTypes: box([]),
      jobStages: box([])
    };
    this.formState = null as any;
    this.availableFilters = {
      siteIds: [],
      serviceLevelNames: [],
      assetTypes: [],
      errorTypes: [],
      jobStages: []
    };
    this.paginationID = 'account-reports-asset-pagination';
  }
}
