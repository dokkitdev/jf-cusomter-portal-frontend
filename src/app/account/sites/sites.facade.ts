import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { configuration } from '@configurations';
import { ComponentStore } from '@ngrx/component-store';
import { tapResponse, concatLatestFrom } from '@ngrx/operators';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Customer } from '@shared/customer';
import { FileService } from '@shared/file';
import { FilterValue } from '@shared/filter-values';
import { NavigationActions, NavigationSelectors } from '@shared/navigation';
import { NotificationService } from '@shared/notification';
import { PaginationResponse } from '@shared/pagination';
import { Site, SiteCountRelationType, SiteFilters, SiteRelationType, SiteService, SiteSortField } from '@shared/site';
import { AppState } from '@shared/store';
import {
  Actions,
  FormControlState,
  formGroupReducer,
  FormGroupState,
  setValue,
  SetValueAction,
  updateGroup
} from 'ngrx-forms';
import { Observable } from 'rxjs';
import { map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { AccountSitesFilterForm } from './shared/forms';
import { AccountSitesQueryParameters } from './shared/models';
import { AccountSitesPageState } from './sites.state';

@Injectable()
export class AccountSitesPageFacade {
  public get isLoading$(): Observable<boolean> {
    return this.componentStore.select((state) => state.isLoading);
  }

  public get isExporting$(): Observable<boolean> {
    return this.componentStore.select((state) => state.isExporting);
  }

  public get items$(): Observable<Array<Site>> {
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

  public get parameters$(): Observable<AccountSitesQueryParameters> {
    return this.componentStore.select((state) => ({
      page: state.page,
      perPage: state.perPage,
      orderBy: state.orderBy,
      desc: state.desc,
      customerID: state.filterFormState.value.customerID,
      name: state.filterFormState.value.name,
      uprn: state.filterFormState.value.uprn,
      query: state.filterFormState.value.query,
      postalCode: state.filterFormState.value.postalCode,
      primaryContactQuery: state.filterFormState.value.primaryContactQuery,
      hasOpenJobs: state.filterFormState.value.hasOpenJobs
    }));
  }

  public get relations$(): Observable<Array<SiteRelationType>> {
    return this.componentStore.select((state) => state.relations);
  }

  public get countRelations$(): Observable<Array<SiteCountRelationType>> {
    return this.componentStore.select((state) => state.countRelations);
  }

  public get filterFormState$(): Observable<FormGroupState<AccountSitesFilterForm>> {
    return this.componentStore.select((state) => state.filterFormState);
  }

  public get filterFormStateValue$(): Observable<AccountSitesFilterForm> {
    return this.componentStore.select((state) => state.filterFormState.value);
  }

  public get filters$(): Observable<SiteFilters> {
    return this
      .filterFormStateValue$
      .pipe(
        map((filterFormStateValue) => new SiteFilters({
          customerIds: (filterFormStateValue.customerID) ? [filterFormStateValue.customerID] : undefined,
          name: filterFormStateValue.name || undefined,
          uprn: filterFormStateValue.uprn || undefined,
          query: filterFormStateValue.query || undefined,
          postalCode: filterFormStateValue.postalCode || undefined,
          primaryContactQuery: filterFormStateValue.primaryContactQuery || undefined,
          hasOpenJobs: filterFormStateValue.hasOpenJobs
        }))
      );
  }

  public get filterValues$(): Observable<Array<FilterValue>> {
    return this.componentStore.select((state) => {
      const formState = state.filterFormState;
      const filterValues = [];

      if (formState.value.customerID && state.selectedCustomer) {
        filterValues.push(
          new FilterValue({ id: formState.controls.customerID.id, value: state.selectedCustomer.name })
        );
      }
      if (formState.value.name) {
        filterValues.push(this.createFilterValue(formState.controls.name));
      }
      if (formState.value.uprn) {
        filterValues.push(this.createFilterValue(formState.controls.uprn));
      }
      if (formState.value.query) {
        filterValues.push(this.createFilterValue(formState.controls.query));
      }
      if (formState.value.postalCode) {
        filterValues.push(this.createFilterValue(formState.controls.postalCode));
      }
      if (formState.value.primaryContactQuery) {
        filterValues.push(this.createFilterValue(formState.controls.primaryContactQuery));
      }
      if (formState.value.hasOpenJobs !== undefined) {
        filterValues.push(new FilterValue({
          id: formState.controls.hasOpenJobs.id,
          value: this.translateService.instant('ACCOUNT.SITES.FILTERS.TEXT_OPEN_JOBS_' + ((formState.value.hasOpenJobs) ? 'YES' : 'NO'))
        }));
      }

      return filterValues;
    });
  }

  private loadItemsEffect$: () => Observable<void>;
  private loadItemsByPageEffect$: (page?: number) => Observable<void>;
  private loadItemsByParametersEffect$: (page?: number) => Observable<void>;
  private exportCSVEffect$: () => Observable<void>;

  constructor(
    private readonly componentStore: ComponentStore<AccountSitesPageState>,
    private readonly store: Store<AppState>,
    private readonly siteService: SiteService,
    private readonly translateService: TranslateService,
    private readonly fileService: FileService,
    private readonly notificationService: NotificationService
  ) {
    this.resetState();

    this.registerLoadItemsEffect();
    this.registerLoadItemsByParametersEffect();
    this.registerLoadItemsByPageEffect();
    this.registerExportCSVEffect();
  }

  public resetState(): void {
    this.componentStore.setState(new AccountSitesPageState());
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

  public changeSort(parameters: AccountSitesQueryParameters): void {
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
    this.handleFormStateAction(new SetValueAction(filter.id, undefined));
  }

  public setSelectedCustomer(customer: Customer): void {
    this.updateSelectedCustomer(customer);
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

  private updateItems(response: PaginationResponse<Site>): void {
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
        page: pageNumber,
        items: []
      })
    )();
  }

  private updateStateSort(parameters: AccountSitesQueryParameters): void {
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

  private updateQueryParameters(parameters: AccountSitesQueryParameters): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        orderBy: parameters.orderBy || state.orderBy,
        desc: (parameters.desc !== undefined) ? parameters.desc : state.desc,
        page: parameters.page || state.page,
        filterFormState: updateGroup<AccountSitesFilterForm>(
          state.filterFormState,
          {
            customerID: setValue(parameters.customerID || state.filterFormState.value.customerID),
            name: setValue(parameters.name || state.filterFormState.value.name),
            uprn: setValue(parameters.uprn || state.filterFormState.value.uprn),
            query: setValue(parameters.query || state.filterFormState.value.query),
            postalCode: setValue(parameters.postalCode || state.filterFormState.value.postalCode),
            primaryContactQuery: setValue(parameters.primaryContactQuery || state.filterFormState.value.primaryContactQuery),
            hasOpenJobs: setValue((parameters.hasOpenJobs !== undefined) ? parameters.hasOpenJobs : state.filterFormState.value.hasOpenJobs)
          }
        )
      })
    )();
  }

  private registerLoadItemsEffect(): void {
    this.loadItemsEffect$ = this.componentStore.effect((origin$: Observable<void>) =>
      origin$.pipe(
        withLatestFrom(
          this.store.select(NavigationSelectors.selectQueryParams)
        ),
        tap(([_, queryParams]) => {
          this.updateIsLoading(true);

          const parameters = new AccountSitesQueryParameters({
            page: (queryParams.page) ? parseInt(queryParams.page, 10) : undefined,
            orderBy: queryParams.orderBy || undefined,
            desc: (queryParams.desc !== undefined) ? queryParams.desc === 'true' : undefined,
            customerID: (queryParams.customerID) ? parseInt(queryParams.customerID, 10) : undefined,
            name: queryParams.name || undefined,
            uprn: queryParams.uprn || undefined,
            query: queryParams.query || undefined,
            postalCode: queryParams.postalCode || undefined,
            primaryContactQuery: queryParams.primaryContactQuery || undefined,
            hasOpenJobs: (queryParams.hasOpenJobs !== undefined) ? queryParams.hasOpenJobs === 'true' : undefined
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
        withLatestFrom(
          this.parameters$,
          this.relations$,
          this.countRelations$,
          this.filters$
        ),
        switchMap(([targetPage, parameters, relations, countRelations, filters]) => {
          const page = targetPage || parameters.page;
          const perPage = parameters.perPage;
          const orderBy = parameters.orderBy;
          const desc = parameters.desc;

          this.store.dispatch(NavigationActions.mergeQueryParams({
            queryParams: {
              page,
              orderBy,
              desc,
              customerID: filters.customerIds,
              name: filters.name,
              uprn: filters.uprn,
              query: filters.query,
              postalCode: filters.postalCode,
              primaryContactQuery: filters.primaryContactQuery,
              hasOpenJobs: filters.hasOpenJobs
            }
          }));

          this.updateIsLoading(true);

          return this.tryLoadItemsByParameters({ page, perPage, orderBy, desc, relations, countRelations, filters });
        })
      )
    );
  }

  private tryLoadItemsByParameters({ page, perPage, orderBy, desc, relations, countRelations, filters }: {
    page: number,
    perPage: number,
    orderBy: SiteSortField,
    desc: boolean,
    relations: Array<SiteRelationType>,
    countRelations: Array<SiteCountRelationType>,
    filters: SiteFilters
  }): Observable<any> {
    return this.siteService
      .search({
        page,
        perPage,
        orderBy,
        desc,
        relations,
        countRelations,
        filters
      })
      .pipe(
        tapResponse(
          (response) => {
            this.updateIsLoading(false);
            this.updateItems(response);
          },
          () => this.updateIsLoading(false)
        )
      );
  }

  private registerExportCSVEffect(): void {
    this.exportCSVEffect$ = this.componentStore.effect((origin$: Observable<void>) =>
      origin$.pipe(
        concatLatestFrom(() => [
          this.parameters$,
          this.filters$,
          this.relations$,
          this.countRelations$
        ]),
        switchMap(([_, parameters, filters, relations, countRelations]) => {
          this.updateIsExporting(true);

          return this.siteService
            .exportCSV({ ...parameters, filters, relations, countRelations })
            .pipe(
              tapResponse(
                (response) => {
                  this.updateIsExporting(false);
                  this.fileService.saveFile(response, configuration.exportCSV.sites);
                },
                (response: HttpErrorResponse) => {
                  this.updateIsExporting(false);

                  const errorTranslationKey =
                    (response.status === HttpStatusCode.BadGateway || response.status === 0)
                      ? 'SHARED.NOTIFICATIONS.TEXT_CSV_EXPORT_ERROR'
                      : 'SHARED.NOTIFICATIONS.TEXT_ERROR';

                  this.notificationService.error(
                    this.translateService.instant(errorTranslationKey)
                  );
                }
              )
            );
        })
      )
    );
  }
}
