import { FormGroupState } from 'ngrx-forms';

export interface AssetReportItem {
  siteId: string;
  uprn: string;
  assetId: string;
  assetType: string;
  serviceLevel: string;
  error: string;
}

export interface AssetReportFilters {
  site: string;
  serviceLevel: string[];
  assetType: string[];
  error: string[];
  stage: string[];
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
  filters: AssetReportFilters;
  formState: FormGroupState<AssetReportFilters>;
}

export class AccountReportsAssetPageState {
  public items: AssetReportItem[] = [];
  public isLoading: boolean = false;
  public currentPage: number = 1;
  public totalPages: number = 0;
  public totalItems: number = 0;
  public perPage: number = 20;
  public orderBy: string = 'siteId';
  public desc: boolean = false;
  public filters: AssetReportFilters = {
    site: '',
    serviceLevel: [],
    assetType: [],
    error: [],
    stage: []
  };
  public formState: FormGroupState<AssetReportFilters> = null as any;
}
