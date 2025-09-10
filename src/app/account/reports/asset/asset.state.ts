import { FormGroupState, Boxed, box } from 'ngrx-forms';
import { AssetReportItem } from '@shared/notify';

export interface AssetReportFormFilters {
  siteId: number | null;
  serviceLevelNames: Boxed<string[]>;
  assetTypes: Boxed<string[]>;
  errorTypes: Boxed<string[]>;
  jobStages: Boxed<string[]>;
}

export interface AccountReportsAssetPageState {
  items: AssetReportItem[];
  isLoading: boolean;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  perPage: number;
  orderBy: string;
  desc: boolean;
  filters: AssetReportFormFilters;
  formState: FormGroupState<AssetReportFormFilters>;
  availableFilters: {
    siteIds: number[];
    serviceLevelNames: string[];
    assetTypes: string[];
    errorTypes: string[];
    jobStages: string[];
  };
}

export class AccountReportsAssetPageState {
  public items: AssetReportItem[] = [];
  public isLoading: boolean = false;
  public currentPage: number = 1;
  public totalPages: number = 0;
  public totalItems: number = 0;
  public perPage: number = 20;
  public orderBy: string = 'site_id';
  public desc: boolean = false;
  public filters: AssetReportFormFilters = {
    siteId: null,
    serviceLevelNames: box([]),
    assetTypes: box([]),
    errorTypes: box([]),
    jobStages: box([])
  };
  public formState: FormGroupState<AssetReportFormFilters> = null as any;
  public availableFilters: {
    siteIds: number[];
    serviceLevelNames: string[];
    assetTypes: string[];
    errorTypes: string[];
    jobStages: string[];
  } = {
    siteIds: [],
    serviceLevelNames: [],
    assetTypes: [],
    errorTypes: [],
    jobStages: []
  };
}
