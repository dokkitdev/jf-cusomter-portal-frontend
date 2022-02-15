import { Asset, AssetRelationType, AssetSortField } from '@shared/asset';
import { Customer } from '@shared/customer';
import { createFormGroupState, FormGroupState } from 'ngrx-forms';
import { AccountAssetsFilterForm } from './shared/forms';

export class AccountAssetsPageState {
  public isLoading: boolean;
  public items: Array<Asset>;
  public totalItems: number;
  public page: number;
  public perPage: number;
  public orderBy: AssetSortField;
  public relations: Array<AssetRelationType>;
  public desc: boolean;
  public filterFormState: FormGroupState<AccountAssetsFilterForm>;
  public selectedCustomer: Customer | undefined;
  public readonly paginationID: string;

  constructor() {
    this.isLoading = false;
    this.items = [];
    this.totalItems = 0;
    this.page = 1;
    this.perPage = 10;
    this.orderBy = AssetSortField.ASSET_ID;
    this.relations = ['site', 'site.customer'];
    this.desc = true;
    this.filterFormState = createFormGroupState('AccountAssetsFilterForm', new AccountAssetsFilterForm());
    this.selectedCustomer = undefined;
    this.paginationID = 'account-assets-pagination';
  }
}
