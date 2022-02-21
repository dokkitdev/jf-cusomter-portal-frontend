import { Injectable } from '@angular/core';
import { configuration } from '@configurations';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { concatLatestFrom } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Asset, AssetFilters, AssetRelationType, AssetService, AssetSortField } from '@shared/asset';
import { Customer } from '@shared/customer';
import { FileService } from '@shared/file';
import { FilterValue } from '@shared/filter-values';
import { getEndDateFilter, getStartDateFilter } from '@shared/form-datepicker';
import { NavigationActions, NavigationSelectors } from '@shared/navigation';
import { PaginationResponse } from '@shared/pagination';
import { AppState } from '@shared/store';
import { castArray, without } from 'lodash';
import { DateTime } from 'luxon';
import {
  Actions,
  box,
  FormControlState,
  formGroupReducer,
  FormGroupState,
  isBoxed,
  setValue,
  SetValueAction,
  unbox,
  updateGroup
} from 'ngrx-forms';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { AccountAssetsPageState } from './assets.state';
import { AccountAssetsFilterForm } from './shared/forms';
import { AccountAssetsQueryParameters } from './shared/models';

@Injectable()
export class AccountAssetsPageFacade {
  public get isLoading$(): Observable<boolean> {
    return this.componentStore.select((state) => state.isLoading);
  }

  public get isExporting$(): Observable<boolean> {
    return this.componentStore.select((state) => state.isExporting);
  }

  public get items$(): Observable<Array<Asset>> {
    return this.componentStore.select((state) => state.items);
  }

  public get perPage$(): Observable<number> {
    return this.componentStore.select((state) => state.perPage);
  }

  public get currentPage$(): Observable<number> {
    return this.componentStore.select((state) => state.page);
  }

  public get totalItems$(): Observable<number> {
    return this.componentStore.select((state) => state.totalItems);
  }

  public get hasPagination$(): Observable<boolean> {
    return this.componentStore.select((state) => state.totalItems > 0);
  }

  public get paginationID$(): Observable<string> {
    return this.componentStore.select((state) => state.paginationID);
  }

  public get parameters$(): Observable<AccountAssetsQueryParameters> {
    return this.componentStore.select((state) => ({
      page: state.page,
      perPage: state.perPage,
      orderBy: state.orderBy,
      desc: state.desc,
      assetID: state.filterFormState.value.assetID,
      simproCustomerID: state.filterFormState.value.simproCustomerID,
      siteID: state.filterFormState.value.siteID,
      siteUprn: state.filterFormState.value.siteUprn,
      siteName: state.filterFormState.value.siteName,
      query: state.filterFormState.value.query,
      location: state.filterFormState.value.location,
      make: state.filterFormState.value.make,
      model: state.filterFormState.value.model,
      archived: state.filterFormState.value.archived,
      lastTestResult: state.filterFormState.value.lastTestResult,
      serviceLevelNames: unbox(state.filterFormState.value.serviceLevelNames),
      lastTestDateFrom: state.filterFormState.value.lastTestDateFrom,
      lastTestDateTo: state.filterFormState.value.lastTestDateTo,
      nextServiceDateFrom: state.filterFormState.value.nextServiceDateFrom,
      nextServiceDateTo: state.filterFormState.value.nextServiceDateTo
    }));
  }

  public get relations$(): Observable<Array<AssetRelationType>> {
    return this.componentStore.select((state) => state.relations);
  }

  public get filterFormState$(): Observable<FormGroupState<AccountAssetsFilterForm>> {
    return this.componentStore.select((state) => state.filterFormState);
  }

  public get filterFormStateValue$(): Observable<AccountAssetsFilterForm> {
    return this.componentStore.select((state) => state.filterFormState.value);
  }

  public get filters$(): Observable<AssetFilters> {
    return this
      .filterFormStateValue$
      .pipe(
        map((filterFormStateValue) => new AssetFilters({
          assetID: filterFormStateValue.assetID || undefined,
          simproCustomerID: filterFormStateValue.simproCustomerID || undefined,
          siteID: filterFormStateValue.siteID || undefined,
          query: filterFormStateValue.query || undefined,
          siteUprn: filterFormStateValue.siteUprn || undefined,
          siteName: filterFormStateValue.siteName || undefined,
          location: filterFormStateValue.location || undefined,
          make: filterFormStateValue.make || undefined,
          model: filterFormStateValue.model || undefined,
          archived: filterFormStateValue.archived,
          lastTestResult: filterFormStateValue.lastTestResult || undefined,
          serviceLevelNames: (unbox(filterFormStateValue.serviceLevelNames).length) ? unbox(filterFormStateValue.serviceLevelNames) : undefined,
          lastTestDateFrom: filterFormStateValue.lastTestDateFrom || undefined,
          lastTestDateTo: filterFormStateValue.lastTestDateTo || undefined,
          nextServiceDateFrom: filterFormStateValue.nextServiceDateFrom || undefined,
          nextServiceDateTo: filterFormStateValue.nextServiceDateTo || undefined
        }))
      );
  }

  public get filterValues$(): Observable<Array<FilterValue>> {
    return this.componentStore.select((state) => {
      const formState = state.filterFormState;
      const filterValues = [];

      if (formState.value.siteID) {
        filterValues.push(this.createFilterValue(formState.controls.siteID));
      }
      if (formState.value.assetID) {
        filterValues.push(this.createFilterValue(formState.controls.assetID));
      }
      if (formState.value.simproCustomerID && state.selectedCustomer) {
        filterValues.push(
          new FilterValue({ id: formState.controls.simproCustomerID.id, value: state.selectedCustomer.name })
        );
      }
      if (formState.value.siteUprn) {
        filterValues.push(this.createFilterValue(formState.controls.siteUprn));
      }
      if (formState.value.siteName) {
        filterValues.push(this.createFilterValue(formState.controls.siteName));
      }
      if (formState.value.query) {
        filterValues.push(this.createFilterValue(formState.controls.query));
      }
      if (formState.value.location) {
        filterValues.push(this.createFilterValue(formState.controls.location));
      }
      if (formState.value.make) {
        filterValues.push(this.createFilterValue(formState.controls.make));
      }
      if (formState.value.model) {
        filterValues.push(this.createFilterValue(formState.controls.model));
      }
      if (formState.value.archived !== undefined) {
        filterValues.push(new FilterValue({
          id: formState.controls.archived.id,
          value: this.translateService.instant('ACCOUNT.ASSETS.FILTERS.TEXT_ARCHIVED_' + ((formState.value.archived) ? 'YES' : 'NO'))
        }));
      }
      if (formState.value.lastTestResult) {
        filterValues.push(this.createFilterValue(formState.controls.lastTestResult));
      }
      unbox(formState.value.serviceLevelNames).forEach((value) =>
        filterValues.push(new FilterValue({ id: formState.controls.serviceLevelNames.id, value }))
      );
      if (formState.value.lastTestDateFrom) {
        filterValues.push(new FilterValue({
          id: formState.controls.lastTestDateFrom.id,
          value: DateTime.fromISO(formState.value.lastTestDateFrom).toFormat(configuration.dateFormats.filterDate)
        }));
      }
      if (formState.value.lastTestDateTo) {
        filterValues.push(new FilterValue({
          id: formState.controls.lastTestDateTo.id,
          value: DateTime.fromISO(formState.value.lastTestDateTo).toFormat(configuration.dateFormats.filterDate)
        }));
      }
      if (formState.value.nextServiceDateFrom) {
        filterValues.push(new FilterValue({
          id: formState.controls.nextServiceDateFrom.id,
          value: DateTime.fromISO(formState.value.nextServiceDateFrom).toFormat(configuration.dateFormats.filterDate)
        }));
      }
      if (formState.value.nextServiceDateTo) {
        filterValues.push(new FilterValue({
          id: formState.controls.nextServiceDateTo.id,
          value: DateTime.fromISO(formState.value.nextServiceDateTo).toFormat(configuration.dateFormats.filterDate)
        }));
      }

      return filterValues;
    });
  }

  private loadItemsEffect$: () => Observable<void>;
  private loadItemsByPageEffect$: (page?: number) => Observable<void>;
  private loadItemsByParametersEffect$: (page?: number) => Observable<void>;
  private removeFilterEffect$: (filter: FilterValue) => Observable<void>;
  private exportCSVEffect$: () => Observable<void>;

  constructor(
    private readonly componentStore: ComponentStore<AccountAssetsPageState>,
    private readonly store: Store<AppState>,
    private readonly assetService: AssetService,
    private readonly translateService: TranslateService,
    private readonly fileService: FileService
  ) {
    this.resetState();

    this.registerLoadItemsEffect();
    this.registerLoadItemsByPageEffect();
    this.registerLoadItemsByParametersEffect();
    this.registerRemoveFilterEffect();
    this.registerExportCSVEffect();
  }

  public resetState(): void {
    this.componentStore.setState(new AccountAssetsPageState());
  }

  public loadItems(): void {
    this.loadItemsEffect$();
  }

  public loadItemsByPage(page: number): void {
    this.loadItemsByPageEffect$(page);
  }

  public loadItemsByParameters(page?: number): void {
    this.loadItemsByParametersEffect$(page);
  }

  public exportCSV(): void {
    this.exportCSVEffect$();
  }

  public changeSort(parameters: AccountAssetsQueryParameters): void {
    this.updateStateSort(parameters);
    this.loadItemsByParameters();
  }

  public handleFormStateAction(action: Actions<any>): void {
    this.updateFormState(action);

    if (action instanceof SetValueAction) {
      this.resetPagination();
      this.loadItemsByParameters();
    }
  }

  public removeFilter(filter: FilterValue): void {
    this.removeFilterEffect$(filter);
  }

  public setSelectedCustomer(customer: Customer): void {
    this.updateSelectedCustomer(customer);
  }

  public getStartLastTestDateFilter$(): Observable<(date: Date) => boolean> {
    return this
      .filterFormState$
      .pipe(
        map((formState) => getStartDateFilter(formState.value.lastTestDateTo))
      );
  }

  public getEndLastTestDateFilter$(): Observable<(date: Date) => boolean> {
    return this
      .filterFormState$
      .pipe(
        map((formState) => getEndDateFilter(formState.value.lastTestDateFrom))
      );
  }

  public getStartNextServiceDateFilter$(): Observable<(date: Date) => boolean> {
    return this
      .filterFormState$
      .pipe(
        map((formState) => getStartDateFilter(formState.value.nextServiceDateTo))
      );
  }

  public getEndNextServiceDateFilter$(): Observable<(date: Date) => boolean> {
    return this
      .filterFormState$
      .pipe(
        map((formState) => getEndDateFilter(formState.value.nextServiceDateFrom))
      );
  }

  private createFilterValue(control: FormControlState<string | number | undefined>): FilterValue {
    return new FilterValue({ id: control.id, value: control.value });
  }

  private updateFormState(action: Actions<any>): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        filterFormState: formGroupReducer(state.filterFormState, action)
      })
    )();
  }

  private updateIsLoading(value: boolean): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        isLoading: value
      })
    )();
  }

  private updateIsExporting(value: boolean): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        isExporting: value
      })
    )();
  }

  private updateItems(response: PaginationResponse<Asset>): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        items: response.items,
        totalItems: response.totalItems
      })
    )();
  }

  private updateSelectedCustomer(customer: Customer): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        selectedCustomer: customer
      })
    )();
  }

  private resetPagination(): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        page: 1,
        items: [],
        totalItems: 0
      })
    )();
  }

  private updatePage(pageNumber: number): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        page: pageNumber
      })
    )();
  }

  private updateStateSort(parameters: AccountAssetsQueryParameters): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        orderBy: parameters.orderBy,
        desc: parameters.desc,
        page: 1,
        items: [],
        totalItems: 0
      })
    )();
  }

  private updateQueryParameters(parameters: AccountAssetsQueryParameters): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        orderBy: parameters.orderBy || state.orderBy,
        desc: parameters.desc || state.desc,
        page: parameters.page || state.page,
        filterFormState: updateGroup<AccountAssetsFilterForm>(
          state.filterFormState,
          {
            assetID: setValue(parameters.assetID || state.filterFormState.value.assetID),
            simproCustomerID: setValue(parameters.simproCustomerID || state.filterFormState.value.simproCustomerID),
            siteID: setValue(parameters.siteID || state.filterFormState.value.siteID),
            siteUprn: setValue(parameters.siteUprn || state.filterFormState.value.siteUprn),
            siteName: setValue(parameters.siteName || state.filterFormState.value.siteName),
            query: setValue(parameters.query || state.filterFormState.value.query),
            location: setValue(parameters.location || state.filterFormState.value.location),
            make: setValue(parameters.make || state.filterFormState.value.make),
            model: setValue(parameters.model || state.filterFormState.value.model),
            archived: setValue((parameters.archived !== undefined) ? parameters.archived : state.filterFormState.value.archived),
            lastTestResult: setValue(parameters.lastTestResult || state.filterFormState.value.lastTestResult),
            serviceLevelNames: setValue((parameters.serviceLevelNames) ? box(parameters.serviceLevelNames) : state.filterFormState.value.serviceLevelNames),
            lastTestDateFrom: setValue(parameters.lastTestDateFrom || state.filterFormState.value.lastTestDateFrom),
            lastTestDateTo: setValue(parameters.lastTestDateTo || state.filterFormState.value.lastTestDateTo),
            nextServiceDateFrom: setValue(parameters.nextServiceDateFrom || state.filterFormState.value.nextServiceDateFrom),
            nextServiceDateTo: setValue(parameters.nextServiceDateTo || state.filterFormState.value.nextServiceDateTo)
          }
        )
      })
    )();
  }

  private registerLoadItemsEffect(): void {
    this.loadItemsEffect$ = this.componentStore.effect((origin$: Observable<void>) =>
      origin$.pipe(
        concatLatestFrom(() => this.store.select(NavigationSelectors.selectQueryParams)),
        tap(([_, queryParams]) => {
          this.updateIsLoading(true);

          const parameters = new AccountAssetsQueryParameters({
            page: (queryParams.page) ? parseInt(queryParams.page, 10) : undefined,
            orderBy: queryParams.orderBy || undefined,
            desc: queryParams.desc === 'true',
            assetID: (queryParams.assetID) ? parseInt(queryParams.assetID, 10) : undefined,
            simproCustomerID: (queryParams.simproCustomerID) ? parseInt(queryParams.simproCustomerID, 10) : undefined,
            siteID: (queryParams.siteID) ? parseInt(queryParams.siteID, 10) : undefined,
            siteUprn: queryParams.siteUprn || undefined,
            siteName: queryParams.siteName || undefined,
            query: queryParams.query || undefined,
            location: queryParams.location || undefined,
            make: queryParams.make || undefined,
            model: queryParams.model || undefined,
            archived: (queryParams.hasOpenJobs !== undefined) ? queryParams.archived === 'true' : undefined,
            lastTestResult: queryParams.lastTestResult || undefined,
            serviceLevelNames: (queryParams.serviceLevelNames) ? castArray(queryParams.serviceLevelNames) : undefined,
            lastTestDateFrom: queryParams.lastTestDateFrom || undefined,
            lastTestDateTo: queryParams.lastTestDateTo || undefined,
            nextServiceDateFrom: queryParams.nextServiceDateFrom || undefined,
            nextServiceDateTo: queryParams.nextServiceDateTo || undefined
          });

          this.updateQueryParameters(parameters);

          return (parameters.page > 1)
            ? this.loadItemsByPage(parameters.page)
            : this.loadItemsByParameters();
        })
      )
    );
  }

  private registerLoadItemsByPageEffect(): void {
    this.loadItemsByPageEffect$ = this.componentStore.effect((origin$: Observable<number>) =>
      origin$.pipe(
        tap((page) => {
          this.updatePage(page);

          this.loadItemsByParameters();
        })
      )
    );
  }

  private registerLoadItemsByParametersEffect(): void {
    this.loadItemsByParametersEffect$ = this.componentStore.effect((origin$: Observable<number>) =>
      origin$.pipe(
        concatLatestFrom(() => [
          this.parameters$,
          this.relations$,
          this.filters$
        ]),
        switchMap(([targetPage, parameters, relations, filters]) => {
          const page = targetPage || parameters.page;
          const perPage = parameters.perPage;
          const orderBy = parameters.orderBy;
          const desc = parameters.desc;

          this.store.dispatch(NavigationActions.mergeQueryParams({
            queryParams: {
              page,
              orderBy,
              desc,
              assetID: filters.assetID,
              simproCustomerID: filters.simproCustomerID,
              siteID: filters.siteID,
              siteUprn: filters.siteUprn,
              siteName: filters.siteName,
              query: filters.query,
              location: filters.location,
              make: filters.make,
              model: filters.model,
              archived: filters.archived,
              lastTestResult: filters.lastTestResult,
              serviceLevelNames: filters.serviceLevelNames,
              lastTestDateFrom: filters.lastTestDateFrom,
              lastTestDateTo: filters.lastTestDateTo,
              nextServiceDateFrom: filters.nextServiceDateFrom,
              nextServiceDateTo: filters.nextServiceDateTo
            }
          }));

          this.updateIsLoading(true);

          return this.tryLoadItemsByParameters({ page, perPage, orderBy, desc, relations, filters });
        })
      )
    );
  }

  private tryLoadItemsByParameters({ page, perPage, orderBy, desc, relations, filters }: {
    page: number,
    perPage: number,
    orderBy: AssetSortField,
    desc: boolean,
    relations: Array<AssetRelationType>,
    filters: AssetFilters
  }): Observable<any> {
    return this.assetService
      .search({
        page,
        perPage,
        orderBy,
        desc,
        relations,
        filters
      })
      .pipe(
        tapResponse(
          (response) => {
            this.updateIsLoading(false);
            this.updateItems(response);
          },
          () => this.updateIsLoading(true)
        )
      );
  }

  private registerExportCSVEffect(): void {
    this.exportCSVEffect$ = this.componentStore.effect((origin$: Observable<void>) =>
      origin$.pipe(
        concatLatestFrom(() => [
          this.parameters$,
          this.filters$,
          this.relations$
        ]),
        switchMap(([_, parameters, filters, relations]) => {
          this.updateIsExporting(true);

          return this.assetService
            .exportCSV({ ...parameters, filters, relations })
            .pipe(
              tapResponse(
                (response) => {
                  this.updateIsExporting(false);
                  this.fileService.saveFile(response, configuration.exportCSV.assets);
                },
                () => {
                  // error
                  this.updateIsExporting(false);
                }
              )
            );
        })
      )
    );
  }

  private registerRemoveFilterEffect(): void {
    this.removeFilterEffect$ = this.componentStore.effect((origin$: Observable<FilterValue>) =>
      origin$.pipe(
        concatLatestFrom(() => this.filterFormState$),
        tap(([filter, formState]) => {
          const controlName = filter.id.split('.')[1] as keyof AccountAssetsFilterForm;

          let filterValue;
          if (isBoxed(formState.controls[controlName].value)) {
            const value = unbox(formState.controls[controlName].value) as Array<string>;
            filterValue = box(without(value, filter.value?.toString()));
          }

          this.handleFormStateAction(new SetValueAction(filter.id, filterValue));
        })
      )
    );
  }
}
