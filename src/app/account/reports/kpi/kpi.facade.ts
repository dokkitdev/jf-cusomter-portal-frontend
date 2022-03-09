import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { configuration } from '@configurations';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { concatLatestFrom } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { FileService } from '@shared/file';
import { FilterValue } from '@shared/filter-values';
import { getEndDateFilter, getStartDateFilter } from '@shared/form-datepicker';
import { Job, JobFilters, JobRelationType, JobService, JobSortField, JobStage } from '@shared/job';
import { NavigationActions, NavigationSelectors } from '@shared/navigation';
import { NotificationService } from '@shared/notification';
import { PaginationResponse } from '@shared/pagination';
import { AppState } from '@shared/store';
import { without } from 'lodash';
import { DateTime } from 'luxon';
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
import { map, switchMap, tap } from 'rxjs/operators';
import { AccountReportsKPIPageState } from './kpi.state';
import { AccountReportsKPIFilterForm } from './shared/forms';
import { AccountReportsKPIQueryParameters } from './shared/models';

@Injectable()
export class AccountReportsKPIPageFacade {
  public get isLoading$(): Observable<boolean> {
    return this.componentStore.select((state) => state.isLoading);
  }

  public get isExporting$(): Observable<boolean> {
    return this.componentStore.select((state) => state.isExporting);
  }

  public get items$(): Observable<Array<Job>> {
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

  public get parameters$(): Observable<AccountReportsKPIQueryParameters> {
    return this.componentStore.select((state) => ({
      page: state.page,
      perPage: state.perPage,
      orderBy: state.orderBy,
      desc: state.desc,
      uprn: state.filterFormState.value.uprn,
      archived: state.filterFormState.value.archived,
      dateCreatedFrom: state.filterFormState.value.dateCreatedFrom,
      dateCreatedTo: state.filterFormState.value.dateCreatedTo
    }));
  }

  public get relations$(): Observable<Array<JobRelationType>> {
    return this.componentStore.select((state) => state.relations);
  }

  public get filterFormState$(): Observable<FormGroupState<AccountReportsKPIFilterForm>> {
    return this.componentStore.select((state) => state.filterFormState);
  }

  public get filterFormStateValue$(): Observable<AccountReportsKPIFilterForm> {
    return this.componentStore.select((state) => state.filterFormState.value);
  }

  public get filters$(): Observable<JobFilters> {
    return this
      .filterFormStateValue$
      .pipe(
        map((filterFormStateValue) => new JobFilters({
          uprn: filterFormStateValue.uprn || undefined,
          archived: filterFormStateValue.archived,
          stage: (filterFormStateValue.archived === undefined) ? [] : this.getArchivedFilterStages(filterFormStateValue.archived),
          dateCreatedFrom: filterFormStateValue.dateCreatedFrom || undefined,
          dateCreatedTo: filterFormStateValue.dateCreatedTo || undefined,
          isRepair: filterFormStateValue.isRepair
        }))
      );
  }

  public get filterValues$(): Observable<Array<FilterValue>> {
    return this.componentStore.select((state) => {
      const formState = state.filterFormState;
      const filterValues = [];

      if (formState.value.uprn) {
        filterValues.push(this.createFilterValue(formState.controls.uprn));
      }
      if (formState.value.archived !== undefined) {
        filterValues.push(new FilterValue({
          id: formState.controls.archived.id,
          value: this.translateService.instant('ACCOUNT.REPORTS.KPI.FILTERS.TEXT_ARCHIVED_' + ((formState.value.archived) ? 'YES' : 'NO'))
        }));
      }
      if (formState.value.dateCreatedFrom) {
        filterValues.push(new FilterValue({
          id: formState.controls.dateCreatedFrom.id,
          value: DateTime.fromISO(formState.value.dateCreatedFrom).toFormat(configuration.dateFormats.filterDate)
        }));
      }
      if (formState.value.dateCreatedTo) {
        filterValues.push(new FilterValue({
          id: formState.controls.dateCreatedTo.id,
          value: DateTime.fromISO(formState.value.dateCreatedTo).toFormat(configuration.dateFormats.filterDate)
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
    private readonly componentStore: ComponentStore<AccountReportsKPIPageState>,
    private readonly store: Store<AppState>,
    private readonly jobService: JobService,
    private readonly translateService: TranslateService,
    private readonly fileService: FileService,
    private readonly notificationService: NotificationService
  ) {
    this.resetState();

    this.registerLoadItemsEffect();
    this.registerLoadItemsByPageEffect();
    this.registerLoadItemsByParametersEffect();
    this.registerExportCSVEffect();
  }

  public resetState(): void {
    this.componentStore.setState(new AccountReportsKPIPageState());
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

  public changeSort(parameters: AccountReportsKPIQueryParameters): void {
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

  public getArchivedFilterStages(isArchived: boolean): Array<JobStage> {
    if (isArchived) {
      return [JobStage.ARCHIVED];
    }

    return without(Object.values(JobStage), JobStage.ARCHIVED);
  }

  public getStartCreatedDateFilter$(): Observable<(date: Date) => boolean> {
    return this
      .filterFormState$
      .pipe(
        map((formState) => getStartDateFilter(formState.value.dateCreatedTo))
      );
  }

  public getEndCreatedDateFilter$(): Observable<(date: Date) => boolean> {
    return this
      .filterFormState$
      .pipe(
        map((formState) => getEndDateFilter(formState.value.dateCreatedFrom))
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

  private updateItems(response: PaginationResponse<Job>): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        items: response.items,
        totalItems: response.totalItems
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

  private updateStateSort(parameters: AccountReportsKPIQueryParameters): void {
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

  private updateQueryParameters(parameters: AccountReportsKPIQueryParameters): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        orderBy: parameters.orderBy || state.orderBy,
        desc: (parameters.desc !== undefined) ? parameters.desc : state.desc,
        page: parameters.page || state.page,
        filterFormState: updateGroup<AccountReportsKPIFilterForm>(
          state.filterFormState,
          {
            uprn: setValue(parameters.uprn || state.filterFormState.value.uprn),
            archived: setValue((parameters.archived !== undefined) ? parameters.archived : state.filterFormState.value.archived),
            dateCreatedFrom: setValue(parameters.dateCreatedFrom || state.filterFormState.value.dateCreatedFrom),
            dateCreatedTo: setValue(parameters.dateCreatedTo || state.filterFormState.value.dateCreatedTo)
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

          const parameters = new AccountReportsKPIQueryParameters({
            page: (queryParams.page) ? parseInt(queryParams.page, 10) : undefined,
            orderBy: queryParams.orderBy || undefined,
            desc: (queryParams.desc !== undefined) ? queryParams.desc === 'true' : undefined,
            uprn: queryParams.uprn || undefined,
            archived: (queryParams.archived !== undefined) ? queryParams.archived === 'true' : undefined,
            dateCreatedFrom: queryParams.dateCreatedFrom || undefined,
            dateCreatedTo: queryParams.dateCreatedTo || undefined
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
              uprn: filters.uprn,
              archived: filters.archived,
              dateCreatedFrom: filters.dateCreatedFrom || undefined,
              dateCreatedTo: filters.dateCreatedTo || undefined
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
    orderBy: JobSortField,
    desc: boolean,
    relations: Array<JobRelationType>,
    filters: JobFilters
  }): Observable<any> {
    return this.jobService
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
          this.relations$
        ]),
        switchMap(([_, parameters, filters, relations]) => {
          this.updateIsExporting(true);

          return this.jobService
            .exportReportCSV({ ...parameters, filters, relations })
            .pipe(
              tapResponse(
                (response) => {
                  const date = DateTime.now().toFormat(configuration.dateFormats.reports.kpiDate);

                  this.updateIsExporting(false);
                  this.fileService.saveFile(response, configuration.exportCSV.jobsReport(date));
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
