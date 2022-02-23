import { AccountReportsServiceControlFilterForm } from './shared/forms/filter';
import { concatLatestFrom } from '@ngrx/effects';
import { AccountReportsServiceControlQueryParameters } from './shared/models/query-parameters';
import { switchMap } from 'rxjs/operators';
import { Observable, tap, map } from 'rxjs';
import { Asset, AssetRelationType, AssetService, AssetSortField, AssetFilters } from '@shared/asset';
import { AccountReportsServiceControlState } from './service-control.state';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Injectable } from '@angular/core';
import { PaginationResponse } from '@shared/pagination';
import { AppState } from '@shared/store';
import { Store } from '@ngrx/store';
import { NavigationActions, NavigationSelectors } from '@shared/navigation';
import {
  Actions as FormActions,
  formGroupReducer,
  FormGroupState,
  SetValueAction,
  updateGroup,
  setValue,
  box,
  unbox
} from 'ngrx-forms';
import { FilterValue, FilterValueStatus } from '@shared/filter-values';
import { Site } from '@shared/site';
import { JobStage } from '@shared/job';
import { configuration } from '@configurations';
import { FileService } from '@shared/file';
import { NotificationService } from '@shared/notification';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { getStartDateFilter, getEndDateFilter } from '@shared/form-datepicker';
import { DateTime } from 'luxon';
import parseInt from 'lodash/parseInt';

@Injectable()
export class AccountReportsServiceControlFacade {
  public get isLoading$(): Observable<boolean> {
    return this.componentStore.select((state) => state.isLoading);
  }

  public get isExporting$(): Observable<boolean> {
    return this.componentStore.select((state) => state.isExporting);
  }

  public get items$(): Observable<Array<Asset>> {
    return this.componentStore.select((state) => state.items);
  };

  public get hasPagination$(): Observable<boolean> {
    return this.componentStore.select((state) => state.totalItems > 0);
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

  public get paginationID$(): Observable<string> {
    return this.componentStore.select((state) => state.paginationId);
  };

  public get parameters$(): Observable<AccountReportsServiceControlQueryParameters> {
    return this.componentStore.select((state) => ({
      page: state.page,
      perPage: state.perPage,
      orderBy: state.orderBy,
      desc: state.desc,
      siteID: state.filterFormState.value.siteID,
      jobStage: unbox(state.filterFormState.value.jobStage),
      jobDueDateFrom: state.filterFormState.value.jobDueDateFrom,
      jobDueDateTo: state.filterFormState.value.jobDueDateTo,
      jobLoggedCompletionDateFrom: state.filterFormState.value.jobLoggedCompletionDateFrom,
      jobLoggedCompletionDateTo: state.filterFormState.value.jobLoggedCompletionDateTo
    }));
  }

  public get relations$(): Observable<Array<AssetRelationType>> {
    return this.componentStore.select((state) => state.relations);
  }

  public get filterFormState$(): Observable<FormGroupState<AccountReportsServiceControlFilterForm>> {
    return this.componentStore.select((state) => state.filterFormState);
  }

  public get filterFormStateValue$(): Observable<AccountReportsServiceControlFilterForm> {
    return this.componentStore.select((state) => state.filterFormState.value);
  }

  public get filterValues$(): Observable<Array<FilterValue>> {
    return this.componentStore.select((state) => {
      const formState = state.filterFormState;
      const filterValues = [];

      if (formState.value.siteID && state.selectedSite) {
        filterValues.push(
          new FilterValue({
            id: formState.controls.siteID.id,
            value: state.selectedSite.name
          })
        );
      }

      if (unbox(formState.value.jobStage)) {
        filterValues.push(
          new FilterValue({
            id: formState.controls.jobStage.id,
            value: unbox(formState.value.jobStage),
            status: this.getJobStageFilterStatus(unbox(formState.value.jobStage))
          })
        );
      }

      if (formState.value.jobDueDateFrom) {
        filterValues.push(new FilterValue({
          id: formState.controls.jobDueDateFrom.id,
          value: DateTime.fromISO(formState.value.jobDueDateFrom).toFormat(configuration.dateFormats.filterDate)
        }));
      }

      if (formState.value.jobDueDateTo) {
        filterValues.push(new FilterValue({
          id: formState.controls.jobDueDateTo.id,
          value: DateTime.fromISO(formState.value.jobDueDateTo).toFormat(configuration.dateFormats.filterDate)
        }));
      }

      if (formState.value.jobLoggedCompletionDateFrom) {
        filterValues.push(new FilterValue({
          id: formState.controls.jobLoggedCompletionDateFrom.id,
          value: DateTime.fromISO(formState.value.jobLoggedCompletionDateFrom).toFormat(configuration.dateFormats.filterDate)
        }));
      }

      if (formState.value.jobLoggedCompletionDateTo) {
        filterValues.push(new FilterValue({
          id: formState.controls.jobLoggedCompletionDateTo.id,
          value: DateTime.fromISO(formState.value.jobLoggedCompletionDateTo).toFormat(configuration.dateFormats.filterDate)
        }));
      }

      return filterValues;
    });
  }

  public get filters$(): Observable<AssetFilters> {
    return this
      .filterFormStateValue$
      .pipe(
        map((filterFormStateValue) => new AssetFilters({
          siteID: filterFormStateValue.siteID || undefined,
          jobStage: unbox(filterFormStateValue.jobStage) ? unbox(filterFormStateValue.jobStage) : undefined,
          jobDueDateFrom: filterFormStateValue.jobDueDateFrom || undefined,
          jobDueDateTo: filterFormStateValue.jobDueDateTo || undefined,
          jobLoggedCompletionDateFrom: filterFormStateValue.jobLoggedCompletionDateFrom || undefined,
          jobLoggedCompletionDateTo: filterFormStateValue.jobLoggedCompletionDateTo || undefined,
        }))
      );
  }

  private loadItemsEffect$: () => Observable<void>;
  private loadItemsByParametersEffect$: (page?: number) => Observable<void>;
  private loadItemsByPageEffect$: (page?: number) => Observable<void>;
  private exportCSVEffect$: () => Observable<void>;

  constructor(
    private readonly componentStore: ComponentStore<AccountReportsServiceControlState>,
    private readonly store: Store<AppState>,
    private readonly assetService: AssetService,
    private readonly fileService: FileService,
    private readonly translateService: TranslateService,
    private readonly notificationService: NotificationService
  ) {
    this.resetState();

    this.registerLoadItemsEffect();
    this.registerLoadItemsByParametersEffect();
    this.registerLoadItemsByPageEffect();
    this.registerExportCSVEffect();
  }

  public resetState(): void {
    this.componentStore.setState(new AccountReportsServiceControlState());
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

  public changeSort(parameters: AccountReportsServiceControlQueryParameters): void {
    this.updateStateSort(parameters);
    this.loadItemsByParameters();
  }

  public handleFormStateAction(action: FormActions<any>): void {
    this.updateFormState(action);

    if (action instanceof SetValueAction) {
      this.resetPagination();
      this.loadItemsByParameters();
    }
  }

  public removeFilter(filter: FilterValue): void {
    this.handleFormStateAction(new SetValueAction(filter.id, undefined));
  }

  public setSelectedSite(site: Site): void {
    this.updateSelectedSite(site);
  }

  public exportCSV(): void {
    this.exportCSVEffect$();
  }

  public getStartJobDueDateFilter$(): Observable<(date: Date) => boolean> {
    return this
      .filterFormState$
      .pipe(
        map((formState) => getStartDateFilter(formState.value.jobDueDateTo))
      );
  }

  public getEndJobDueDateFilter$(): Observable<(date: Date) => boolean> {
    return this
      .filterFormState$
      .pipe(
        map((formState) => getEndDateFilter(formState.value.jobDueDateFrom))
      );
  }

  public getStartJobLoggedCompletionDateFilter$(): Observable<(date: Date) => boolean> {
    return this
      .filterFormState$
      .pipe(
        map((formState) => getStartDateFilter(formState.value.jobLoggedCompletionDateTo))
      );
  }

  public getEndJobLoggedCompletionDateFilter$(): Observable<(date: Date) => boolean> {
    return this
      .filterFormState$
      .pipe(
        map((formState) => getEndDateFilter(formState.value.jobLoggedCompletionDateFrom))
      );
  }

  private getJobStageFilterStatus(stage: JobStage | undefined): FilterValueStatus {
    switch (stage) {
      case JobStage.PENDING:
        return FilterValueStatus.PENDING;
      case JobStage.COMPLETE:
        return FilterValueStatus.COMPLETED;
      case JobStage.ARCHIVED:
        return FilterValueStatus.CANCELED;
      default:
        return FilterValueStatus.DEFAULT;
    }
  }

  private updateFormState(action: FormActions<any>): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        filterFormState: formGroupReducer(state.filterFormState, action)
      })
    )();
  }

  private updateIsLoading(isLoading: boolean): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        isLoading
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

  private updatePage(pageNumber: number): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        page: pageNumber
      })
    )();
  }

  private updateQueryParameters(parameters: AccountReportsServiceControlQueryParameters): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        orderBy: parameters.orderBy || state.orderBy,
        desc: parameters.desc || state.desc,
        page: parameters.page || state.page,
        filterFormState: updateGroup<AccountReportsServiceControlFilterForm>(
          state.filterFormState,
          {
            siteID: setValue(parameters.siteID || state.filterFormState.value.siteID),
            jobStage: setValue((parameters.jobStage) ? box(parameters.jobStage) : state.filterFormState.value.jobStage),
            jobDueDateFrom: setValue(parameters.jobDueDateFrom || state.filterFormState.value.jobDueDateFrom),
            jobDueDateTo: setValue(parameters.jobDueDateTo || state.filterFormState.value.jobDueDateTo),
            jobLoggedCompletionDateFrom: setValue(parameters.jobLoggedCompletionDateFrom || state.filterFormState.value.jobLoggedCompletionDateFrom),
            jobLoggedCompletionDateTo: setValue(parameters.jobLoggedCompletionDateTo || state.filterFormState.value.jobLoggedCompletionDateTo)
          }
        )
      })
    )();
  }

  private updateStateSort(parameters: AccountReportsServiceControlQueryParameters): void {
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

  private updateSelectedSite(site: Site): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        selectedSite: site
      })
    )();
  }

  private registerLoadItemsEffect(): void {
    this.loadItemsEffect$ = this.componentStore.effect((origin$: Observable<void>) =>
      origin$.pipe(
        concatLatestFrom(() => this.store.select(NavigationSelectors.selectQueryParams)),
        tap(([_, queryParams]) => {
          this.updateIsLoading(true);

          const parameters = new AccountReportsServiceControlQueryParameters({
            page: (queryParams.page) ? parseInt(queryParams.page, 10) : undefined,
            orderBy: queryParams.orderBy || undefined,
            desc: queryParams.desc === 'true',
            siteID: (queryParams.siteID) ? parseInt(queryParams.siteID) : undefined,
            jobStage: queryParams.jobStage || undefined,
            jobDueDateFrom: queryParams.jobDueDateFrom || undefined,
            jobDueDateTo: queryParams.jobDueDateTo || undefined,
            jobLoggedCompletionDateFrom: queryParams.jobLoggedCompletionDateFrom || undefined,
            jobLoggedCompletionDateTo: queryParams.jobLoggedCompletionDateTo || undefined
          });

          this.updateQueryParameters(parameters);

          return (parameters.page > 1)
            ? this.loadItemsByPage(parameters.page)
            : this.loadItemsByParameters();
        })
      )
    );
  }

  private registerLoadItemsByParametersEffect(): void {
    this.loadItemsByParametersEffect$ = this.componentStore.effect((origin$: Observable<void>) =>
      origin$
        .pipe(
          concatLatestFrom(() => [
            this.parameters$,
            this.relations$,
            this.filters$
          ]),
          switchMap(([_, parameters, relations, filters]) => {
            const { page, perPage, orderBy, desc } = parameters;

            this.store.dispatch(NavigationActions.mergeQueryParams({
              queryParams: {
                page,
                orderBy,
                desc,
                siteID: filters.siteID,
                jobStage: filters.jobStage,
                jobDueDateFrom: filters.jobDueDateFrom || undefined,
                jobDueDateTo: filters.jobDueDateTo || undefined,
                jobLoggedCompletionDateFrom: filters.jobLoggedCompletionDateFrom || undefined,
                jobLoggedCompletionDateTo: filters.jobLoggedCompletionDateTo || undefined
              }
            }));
            this.updateIsLoading(true);

            return this.tryLoadItemsByParameters({
              page,
              perPage,
              orderBy,
              desc,
              relations,
              filters
            });
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

  private tryLoadItemsByParameters({ page, perPage, orderBy, desc, relations, filters }: {
    page: number,
    perPage: number,
    orderBy: AssetSortField,
    desc: boolean,
    relations: Array<AssetRelationType>,
    filters: AssetFilters
  }): Observable<PaginationResponse<Asset>> {
    return this.assetService
      .search({ page, perPage, orderBy, desc, relations, filters })
      .pipe(
        tapResponse(
          (response) => this.onLoadItemsSuccess(response),
          (error: Error) => this.onLoadItemsError(error)
        )
      );
  }

  private onLoadItemsSuccess(response: PaginationResponse<Asset>): void {
    this.updateIsLoading(false);
    this.updateItems(response);
  }

  private onLoadItemsError(error: Error): void {
    this.updateIsLoading(false);
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
            .exportReportCSV({ ...parameters, filters, relations })
            .pipe(
              tapResponse(
                (response) => {
                  this.updateIsExporting(false);
                  this.fileService.saveFile(response, configuration.exportCSV.assetsReport);
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
