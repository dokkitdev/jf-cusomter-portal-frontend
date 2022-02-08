import { Site, SiteFilters, SiteSortField } from '@shared/site';
import { createFormControlState, FormControlState } from 'ngrx-forms';
import { SiteIDField } from './types';

export class AccountSiteSelectComponentState {
  public items: Array<Site>;
  public totalItems: number;
  public isLoading: boolean;
  public page: number;
  public perPage: number;
  public orderBy: SiteSortField;
  public desc: boolean;
  public filters: SiteFilters;
  public controlState: FormControlState<number>;
  public idField: SiteIDField;

  constructor() {
    this.items = [];
    this.totalItems = 0;
    this.isLoading = false;
    this.page = 1;
    this.perPage = 10;
    this.orderBy = SiteSortField.NAME;
    this.desc = false;
    this.filters = new SiteFilters();
    this.controlState = createFormControlState('', 0);
    this.idField = 'id';
  }
}
