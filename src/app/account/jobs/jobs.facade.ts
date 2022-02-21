import { Injectable } from '@angular/core';
import { configuration } from '@configurations';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { concatLatestFrom } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { FileService } from '@shared/file';
import { FilterValue, FilterValueStatus } from '@shared/filter-values';
import { getEndDateFilter, getStartDateFilter } from '@shared/form-datepicker';
import {
  Job,
  JobCountRelationType,
  JobFilters,
  JobRelationType,
  JobService,
  JobSortField,
  JobStage
} from '@shared/job';
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
import { AccountJobsPageState } from './jobs.state';
import { AccountJobsFilterForm } from './shared/forms';
import { AccountJobsQueryParameters } from './shared/models';

@Injectable()
export class AccountJobsPageFacade {
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

  public get parameters$(): Observable<AccountJobsQueryParameters> {
    return this.componentStore.select((state) => ({
      page: state.page,
      perPage: state.perPage,
      orderBy: state.orderBy,
      desc: state.desc,
      jobID: state.filterFormState.value.jobID,
      siteID: state.filterFormState.value.siteID,
      orderNo: state.filterFormState.value.orderNo,
      uprn: state.filterFormState.value.uprn,
      siteName: state.filterFormState.value.siteName,
      postalCode: state.filterFormState.value.postalCode,
      costCenterName: unbox(state.filterFormState.value.costCenterName),
      stage: unbox(state.filterFormState.value.stage),
      appointmentFrom: state.filterFormState.value.appointmentFrom,
      appointmentTo: state.filterFormState.value.appointmentTo,
      startTimeFrom: state.filterFormState.value.startTimeFrom,
      startTimeTo: state.filterFormState.value.startTimeTo,
      dateCreated: state.filterFormState.value.dateCreated,
      outOfHours: state.filterFormState.value.outOfHours
    }));
  }

  public get relations$(): Observable<Array<JobRelationType>> {
    return this.componentStore.select((state) => state.relations);
  }

  public get countRelations$(): Observable<Array<JobCountRelationType>> {
    return this.componentStore.select((state) => state.countRelations);
  }

  public get filterFormState$(): Observable<FormGroupState<AccountJobsFilterForm>> {
    return this.componentStore.select((state) => state.filterFormState);
  }

  public get filterFormStateValue$(): Observable<AccountJobsFilterForm> {
    return this.componentStore.select((state) => state.filterFormState.value);
  }

  public get filters$(): Observable<JobFilters> {
    return this
      .filterFormStateValue$
      .pipe(
        map((filterFormStateValue) => new JobFilters({
          jobID: filterFormStateValue.jobID || undefined,
          siteID: filterFormStateValue.siteID || undefined,
          orderNo: filterFormStateValue.orderNo || undefined,
          uprn: filterFormStateValue.uprn || undefined,
          siteName: filterFormStateValue.siteName || undefined,
          postalCode: filterFormStateValue.postalCode || undefined,
          costCenterName: (unbox(filterFormStateValue.costCenterName).length) ? unbox(filterFormStateValue.costCenterName) : undefined,
          stage: (unbox(filterFormStateValue.stage).length) ? unbox(filterFormStateValue.stage) : undefined,
          appointmentFrom: filterFormStateValue.appointmentFrom || undefined,
          appointmentTo: filterFormStateValue.appointmentTo || undefined,
          dateCreated: filterFormStateValue.dateCreated || undefined,
          outOfHours: filterFormStateValue.outOfHours,
          startTimeFrom: (filterFormStateValue.startTimeFrom) ? DateTime.fromISO(filterFormStateValue.startTimeFrom).toFormat(configuration.dateFormats.scheduleFilter) : undefined,
          startTimeTo: (filterFormStateValue.startTimeTo) ? DateTime.fromISO(filterFormStateValue.startTimeTo).toFormat(configuration.dateFormats.scheduleFilter) : undefined
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
      if (formState.value.dateCreated) {
        filterValues.push(new FilterValue({
          id: formState.controls.dateCreated.id,
          value: this.translateService.instant('ACCOUNT.JOBS.FILTERS.TEXT_CREATED_TODAY')
        }));
      }
      if (formState.value.outOfHours) {
        filterValues.push(new FilterValue({
          id: formState.controls.outOfHours.id,
          value: this.translateService.instant('ACCOUNT.JOBS.FILTERS.TEXT_OUT_OF_HOURS')
        }));
      }
      if (formState.value.jobID) {
        filterValues.push(this.createFilterValue(formState.controls.jobID));
      }
      if (formState.value.orderNo) {
        filterValues.push(this.createFilterValue(formState.controls.orderNo));
      }
      if (formState.value.uprn) {
        filterValues.push(this.createFilterValue(formState.controls.uprn));
      }
      if (formState.value.siteName) {
        filterValues.push(this.createFilterValue(formState.controls.siteName));
      }
      if (formState.value.postalCode) {
        filterValues.push(this.createFilterValue(formState.controls.postalCode));
      }
      unbox(formState.value.costCenterName).forEach((value) =>
        filterValues.push(new FilterValue({ id: formState.controls.costCenterName.id, value }))
      );
      unbox(formState.value.stage).forEach((value) =>
        filterValues.push(new FilterValue({ id: formState.controls.stage.id, value, status: this.getJobStageFilterStatus(value) }))
      );
      if (formState.value.appointmentFrom) {
        filterValues.push(new FilterValue({
          id: formState.controls.appointmentFrom.id,
          value: DateTime.fromISO(formState.value.appointmentFrom).toFormat(configuration.dateFormats.filterDate)
        }));
      }
      if (formState.value.appointmentTo) {
        filterValues.push(new FilterValue({
          id: formState.controls.appointmentTo.id,
          value: DateTime.fromISO(formState.value.appointmentTo).toFormat(configuration.dateFormats.filterDate)
        }));
      }
      if (formState.value.startTimeFrom) {
        filterValues.push(this.createFilterValue(formState.controls.startTimeFrom));
      }
      if (formState.value.startTimeTo) {
        filterValues.push(this.createFilterValue(formState.controls.startTimeTo));
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
    private readonly componentStore: ComponentStore<AccountJobsPageState>,
    private readonly store: Store<AppState>,
    private readonly jobService: JobService,
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
    this.componentStore.setState(new AccountJobsPageState());
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

  public changeSort(parameters: AccountJobsQueryParameters): void {
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

  public getStartAppointmentDateFilter$(): Observable<(date: Date) => boolean> {
    return this
      .filterFormState$
      .pipe(
        map((formState) => getStartDateFilter(formState.value.appointmentTo))
      );
  }

  public getEndAppointmentDateFilter$(): Observable<(date: Date) => boolean> {
    return this
      .filterFormState$
      .pipe(
        map((formState) => getEndDateFilter(formState.value.appointmentFrom))
      );
  }

  private createFilterValue(control: FormControlState<string | number | undefined>): FilterValue {
    return new FilterValue({ id: control.id, value: control.value });
  }

  private getJobStageFilterStatus(stage: JobStage): FilterValueStatus {
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
        page: pageNumber
      })
    )();
  }

  private updateStateSort(parameters: AccountJobsQueryParameters): void {
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

  private updateQueryParameters(parameters: AccountJobsQueryParameters): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        orderBy: parameters.orderBy || state.orderBy,
        desc: parameters.desc || state.desc,
        page: parameters.page || state.page,
        filterFormState: updateGroup<AccountJobsFilterForm>(
          state.filterFormState,
          {
            siteID: setValue(parameters.siteID || state.filterFormState.value.siteID),
            jobID: setValue(parameters.jobID || state.filterFormState.value.jobID),
            orderNo: setValue(parameters.orderNo || state.filterFormState.value.orderNo),
            uprn: setValue(parameters.uprn || state.filterFormState.value.uprn),
            siteName: setValue(parameters.siteName || state.filterFormState.value.siteName),
            postalCode: setValue(parameters.postalCode || state.filterFormState.value.postalCode),
            costCenterName: setValue((parameters.costCenterName) ? box(parameters.costCenterName) : state.filterFormState.value.costCenterName),
            stage: setValue((parameters.stage) ? box(parameters.stage) : state.filterFormState.value.stage),
            appointmentFrom: setValue(parameters.appointmentFrom || state.filterFormState.value.appointmentFrom),
            appointmentTo: setValue(parameters.appointmentTo || state.filterFormState.value.appointmentTo),
            dateCreated: setValue(parameters.dateCreated || state.filterFormState.value.dateCreated),
            outOfHours: setValue((parameters.outOfHours !== undefined) ? parameters.outOfHours : state.filterFormState.value.outOfHours),
            startTimeFrom: setValue(parameters.startTimeFrom || state.filterFormState.value.startTimeFrom),
            startTimeTo: setValue(parameters.startTimeTo || state.filterFormState.value.startTimeTo)
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

          const parameters = new AccountJobsQueryParameters({
            page: (queryParams.page) ? parseInt(queryParams.page, 10) : undefined,
            orderBy: queryParams.orderBy || undefined,
            desc: queryParams.desc === 'true',
            siteID: (queryParams.siteID) ? parseInt(queryParams.siteID, 10) : undefined,
            jobID: (queryParams.jobID) ? parseInt(queryParams.jobID, 10) : undefined,
            orderNo: queryParams.orderNo || undefined,
            uprn: queryParams.uprn || undefined,
            siteName: queryParams.siteName || undefined,
            postalCode: queryParams.postalCode || undefined,
            costCenterName: (queryParams.costCenterName) ? castArray(queryParams.costCenterName) : undefined,
            stage: (queryParams.stage) ? castArray(queryParams.stage) : undefined,
            appointmentFrom: queryParams.appointmentFrom || undefined,
            appointmentTo: queryParams.appointmentTo || undefined,
            dateCreated: queryParams.dateCreated || undefined,
            outOfHours: (queryParams.outOfHours !== undefined) ? queryParams.outOfHours === 'true' : undefined,
            startTimeFrom: queryParams.startTimeFrom || undefined,
            startTimeTo: queryParams.startTimeTo || undefined
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
          this.countRelations$,
          this.filters$
        ]),
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
              jobID: filters.jobID,
              siteID: filters.siteID,
              orderNo: filters.orderNo,
              uprn: filters.uprn,
              siteName: filters.siteName,
              postalCode: filters.postalCode,
              costCenterName: filters.costCenterName,
              stage: filters.stage,
              appointmentFrom: filters.appointmentFrom,
              appointmentTo: filters.appointmentTo,
              dateCreated: filters.dateCreated,
              outOfHours: filters.outOfHours,
              startTimeFrom: parameters.startTimeFrom || undefined,
              startTimeTo: parameters.startTimeTo || undefined
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
    orderBy: JobSortField,
    desc: boolean,
    relations: Array<JobRelationType>,
    countRelations: Array<JobCountRelationType>,
    filters: JobFilters
  }): Observable<any> {
    return this.jobService
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

          return this.jobService
            .exportCSV({ ...parameters, filters, relations, countRelations })
            .pipe(
              tapResponse(
                (response) => {
                  this.updateIsExporting(false);
                  this.fileService.saveFile(response, configuration.exportCSV.jobs);
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
          const controlName = filter.id.split('.')[1] as keyof AccountJobsFilterForm;

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
