import { Injectable } from '@angular/core';
import { configuration } from '@configurations';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { Customer } from '@shared/customer';
import { FilterValue, FilterValueStatus } from '@shared/filter-values';
import { getEndDateFilter, getStartDateFilter } from '@shared/form-datepicker';
import { Job, JobFilters, JobRelationType, JobService, JobSortField, JobStage } from '@shared/job';
import { NavigationActions, NavigationSelectors } from '@shared/navigation';
import { PaginationResponse } from '@shared/pagination';
import { Site } from '@shared/site';
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
import { map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { AccountJobsPageState } from './jobs.state';
import { AccountJobsFilterForm } from './shared/forms';
import { AccountJobsQueryParameters } from './shared/models';

@Injectable()
export class AccountJobsPageFacade {
  public get isLoading$(): Observable<boolean> {
    return this.componentStore.select((state) => state.isLoading);
  }

  public get isLoadingToPage$(): Observable<boolean> {
    return this.componentStore.select((state) => state.isLoadingToPage);
  }

  public get hasMoreItems$(): Observable<boolean> {
    return this.componentStore.select((state) => state.totalItems > state.items.length);
  }

  public get items$(): Observable<Array<Job>> {
    return this.componentStore.select((state) => state.items);
  }

  public get parameters$(): Observable<AccountJobsQueryParameters> {
    return this.componentStore.select((state) => ({
      page: state.page,
      perPage: state.perPage,
      orderBy: state.orderBy,
      desc: state.desc,
      jobID: state.filterFormState.value.jobID,
      simproCustomerID: state.filterFormState.value.simproCustomerID,
      simproSiteID: state.filterFormState.value.simproSiteID,
      postalCode: state.filterFormState.value.postalCode,
      costCenterName: unbox(state.filterFormState.value.costCenterName),
      // businessGroup: unbox(state.filterFormState.value.businessGroup),
      stage: unbox(state.filterFormState.value.stage),
      jobStatus: unbox(state.filterFormState.value.jobStatus),
      appointmentFrom: state.filterFormState.value.appointmentFrom,
      appointmentTo: state.filterFormState.value.appointmentTo,
      startTimeFrom: state.filterFormState.value.startTimeFrom,
      startTimeTo: state.filterFormState.value.startTimeTo
    }));
  }

  public get relations$(): Observable<Array<JobRelationType>> {
    return this.componentStore.select((state) => state.relations);
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
          simproCustomerID: filterFormStateValue.simproCustomerID || undefined,
          simproSiteID: filterFormStateValue.simproSiteID || undefined,
          postalCode: filterFormStateValue.postalCode || undefined,
          costCenterName: (unbox(filterFormStateValue.costCenterName).length) ? unbox(filterFormStateValue.costCenterName) : undefined,
          // businessGroup: (unbox(filterFormStateValue.businessGroup).length) ? unbox(filterFormStateValue.businessGroup) : undefined,
          appointmentFrom: filterFormStateValue.appointmentFrom || undefined,
          appointmentTo: filterFormStateValue.appointmentTo || undefined,
          startTimeFrom: (filterFormStateValue.startTimeFrom) ? DateTime.fromISO(filterFormStateValue.startTimeFrom).toFormat(configuration.dateFormats.scheduleFilter) : undefined,
          startTimeTo: (filterFormStateValue.startTimeTo) ? DateTime.fromISO(filterFormStateValue.startTimeTo).toFormat(configuration.dateFormats.scheduleFilter) : undefined,
          stage: (unbox(filterFormStateValue.stage).length) ? unbox(filterFormStateValue.stage) : undefined,
          jobStatus: (unbox(filterFormStateValue.jobStatus).length) ? unbox(filterFormStateValue.jobStatus) : undefined
        }))
      );
  }

  public get filterValues$(): Observable<Array<FilterValue>> {
    return this.componentStore.select((state) => {
      const formState = state.filterFormState;
      const filterValues = [];

      if (formState.value.jobID) {
        filterValues.push(this.createFilterValue(formState.controls.jobID));
      }
      if (formState.value.simproCustomerID && state.selectedCustomer) {
        filterValues.push(
          new FilterValue({ id: formState.controls.simproCustomerID.id, value: state.selectedCustomer.name })
        );
      }
      if (formState.value.simproSiteID && state.selectedSite) {
        filterValues.push(
          new FilterValue({ id: formState.controls.simproSiteID.id, value: state.selectedSite.name })
        );
      }
      if (formState.value.postalCode) {
        filterValues.push(this.createFilterValue(formState.controls.postalCode));
      }
      unbox(formState.value.costCenterName).forEach((value) =>
        filterValues.push(new FilterValue({ id: formState.controls.costCenterName.id, value }))
      );
      /* unbox(formState.value.businessGroup).forEach((value) =>
        filterValues.push(new FilterValue({ id: formState.controls.businessGroup.id, value }))
      ); */
      unbox(formState.value.stage).forEach((value) =>
        filterValues.push(new FilterValue({ id: formState.controls.stage.id, value, status: this.getJobStageFilterStatus(value) }))
      );
      unbox(formState.value.jobStatus).forEach((value) =>
        filterValues.push(new FilterValue({ id: formState.controls.jobStatus.id, value }))
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
  private loadItemsByParametersEffect$: (page?: number) => Observable<void>;
  private loadNextPageEffect$: () => Observable<void>;
  private loadItemsToPageEffect$: () => Observable<void>;
  private removeFilterEffect$: (filter: FilterValue) => Observable<void>;

  constructor(
    private readonly componentStore: ComponentStore<AccountJobsPageState>,
    private readonly store: Store<AppState>,
    private readonly jobService: JobService
  ) {
    this.resetState();

    this.registerLoadItemsEffect();
    this.registerLoadItemsByParametersEffect();
    this.registerLoadNextPageEffect();
    this.registerLoadItemsToPageEffect();
    this.registerRemoveFilterEffect();
  }

  public resetState(): void {
    this.componentStore.setState(new AccountJobsPageState());
  }

  public loadItems(): void {
    this.loadItemsEffect$();
  }

  public loadItemsByParameters(page?: number): void {
    this.loadItemsByParametersEffect$(page);
  }

  public loadItemsToPage(): void {
    this.loadItemsToPageEffect$();
  }

  public loadNextPage(): void {
    this.loadNextPageEffect$();
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

  public setSelectedCustomer(customer: Customer): void {
    this.updateSelectedCustomer(customer);
  }

  public setSelectedSite(site: Site): void {
    this.updateSelectedSite(site);
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
      case JobStage.PROGRESS:
        return FilterValueStatus.OPENED;
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

  private updateIsLoadingToPage(value: boolean): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        isLoadingToPage: value
      })
    )();
  }

  private updateItems(response: PaginationResponse<Job>): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        items: [...state.items, ...response.items],
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

  private updateSelectedSite(site: Site): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        selectedSite: site
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

  private updateNextPage(): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        page: state.page + 1
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
            jobID: setValue(parameters.jobID || state.filterFormState.value.jobID),
            simproCustomerID: setValue(parameters.simproCustomerID || state.filterFormState.value.simproCustomerID),
            simproSiteID: setValue(parameters.simproSiteID || state.filterFormState.value.simproSiteID),
            postalCode: setValue(parameters.postalCode || state.filterFormState.value.postalCode),
            costCenterName: setValue((parameters.costCenterName) ? box(parameters.costCenterName) : state.filterFormState.value.costCenterName),
            // businessGroup: setValue((parameters.businessGroup) ? box(parameters.businessGroup) : state.filterFormState.value.businessGroup),
            stage: setValue((parameters.stage) ? box(parameters.stage) : state.filterFormState.value.stage),
            jobStatus: setValue((parameters.jobStatus) ? box(parameters.jobStatus) : state.filterFormState.value.jobStatus),
            appointmentFrom: setValue(parameters.appointmentFrom || state.filterFormState.value.appointmentFrom),
            appointmentTo: setValue(parameters.appointmentTo || state.filterFormState.value.appointmentTo),
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
        withLatestFrom(
          this.store.select(NavigationSelectors.selectQueryParams)
        ),
        tap(([_, queryParams]) => {
          this.updateIsLoading(true);

          const parameters = new AccountJobsQueryParameters({
            page: (queryParams.page) ? parseInt(queryParams.page, 10) : undefined,
            orderBy: queryParams.orderBy || undefined,
            desc: queryParams.desc === 'true',
            jobID: (queryParams.jobID) ? parseInt(queryParams.jobID, 10) : undefined,
            simproCustomerID: (queryParams.simproCustomerID) ? parseInt(queryParams.simproCustomerID, 10) : undefined,
            simproSiteID: (queryParams.simproSiteID) ? parseInt(queryParams.simproSiteID, 10) : undefined,
            postalCode: queryParams.postalCode || undefined,
            costCenterName: (queryParams.costCenterName) ? castArray(queryParams.costCenterName) : undefined,
            // businessGroup: (queryParams.businessGroup) ? castArray(queryParams.businessGroup) : undefined,
            stage: (queryParams.stage) ? castArray(queryParams.stage) : undefined,
            jobStatus: (queryParams.jobStatus) ? castArray(queryParams.jobStatus) : undefined,
            appointmentFrom: queryParams.appointmentFrom || undefined,
            appointmentTo: queryParams.appointmentTo || undefined,
            startTimeFrom: queryParams.startTimeFrom || undefined,
            startTimeTo: queryParams.startTimeTo || undefined
          });

          this.updateQueryParameters(parameters);

          return (parameters.page > 1)
            ? this.loadItemsToPage()
            : this.loadItemsByParameters();
        })
      )
    );
  }

  private registerLoadItemsByParametersEffect(): void {
    this.loadItemsByParametersEffect$ = this.componentStore.effect((origin$: Observable<number>) =>
      origin$.pipe(
        withLatestFrom(
          this.parameters$,
          this.isLoadingToPage$,
          this.relations$,
          this.filters$
        ),
        switchMap(([targetPage, parameters, isLoadingToPage, relations, filters]) => {
          const page = targetPage || parameters.page;
          const perPage = parameters.perPage;
          const orderBy = parameters.orderBy;
          const desc = parameters.desc;

          if (!isLoadingToPage) {
            this.store.dispatch(NavigationActions.mergeQueryParams({
              queryParams: {
                page,
                orderBy,
                desc,
                jobID: filters.jobID,
                simproCustomerID: filters.simproCustomerID,
                simproSiteID: filters.simproSiteID,
                postalCode: filters.postalCode,
                costCenterName: filters.costCenterName,
                // businessGroup: filters.businessGroup,
                stage: filters.stage,
                jobStatus: filters.jobStatus,
                appointmentFrom: filters.appointmentFrom,
                appointmentTo: filters.appointmentTo,
                startTimeFrom: parameters.startTimeFrom || undefined,
                startTimeTo: parameters.startTimeTo || undefined
              }
            }));
          }

          this.updateIsLoading(true);

          return this.tryLoadItemsByParameters(page, perPage, orderBy, desc, relations, filters);
        })
      )
    );
  }

  private tryLoadItemsByParameters(
    page: number, perPage: number, orderBy: JobSortField, desc: boolean,
    relations: Array<JobRelationType>, filters: JobFilters
  ): Observable<any> {
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
        withLatestFrom(
          this.isLoadingToPage$,
          this.parameters$
        ),
        tapResponse(
          ([response, isLoadingToPage, parameters]) => {
            this.updateIsLoading(false);
            this.updateItems(response);

            if (!isLoadingToPage) {
              return;
            }

            if (response.currentPage >= parameters.page) {
              this.updateIsLoadingToPage(false);

              return;
            }

            if (response.currentPage !== response.lastPage) {
              this.loadItemsByParameters(response.currentPage + 1);

              return;
            }

            this.updateIsLoadingToPage(false);
            this.updateQueryParameters(new AccountJobsQueryParameters({ page: response.currentPage }));
            this.store.dispatch(NavigationActions.mergeQueryParams({
              queryParams: { page: response.currentPage }
            }));
          },
          () => this.updateIsLoading(false)
        )
      );
  }

  private registerLoadNextPageEffect(): void {
    this.loadNextPageEffect$ = this.componentStore.effect((origin$: Observable<void>) =>
      origin$.pipe(
        tap(() => {
          this.updateNextPage();

          this.loadItemsByParameters();
        })
      )
    );
  }

  private registerLoadItemsToPageEffect(): void {
    this.loadItemsToPageEffect$ = this.componentStore.effect((origin$: Observable<void>) =>
      origin$.pipe(
        tap(() => {
          this.updateIsLoadingToPage(true);

          this.loadItemsByParameters(1);
        })
      )
    );
  }

  private registerRemoveFilterEffect(): void {
    this.removeFilterEffect$ = this.componentStore.effect((origin$: Observable<FilterValue>) =>
      origin$.pipe(
        withLatestFrom(
          this.filterFormState$
        ),
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
