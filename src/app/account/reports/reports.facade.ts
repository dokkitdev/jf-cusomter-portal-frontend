import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '@shared/store';
import { Report, ReportFilters, ReportRelationType, ReportSortField } from '@shared/report';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { AccountReportsQueryParameters } from './shared/models';
import { PaginationResponse } from '@shared/pagination';
import { exhaustMap, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { NavigationActions, NavigationSelectors } from '@shared/navigation';
import { Media, MediaService } from '@shared/media';
import { FileService } from '@shared/file';
import { Actions, box, FormControlState, formGroupReducer, FormGroupState, setValue, SetValueAction, unbox, updateGroup } from 'ngrx-forms';
import { AccountReportsFilterForm } from './shared/forms';
import { FilterValue } from '@shared/filter-values';
import { DateTime } from 'luxon';
import { configuration } from '@configurations';
import { ReportService } from '@shared/report';
import { AccountReportsPageState } from './reports.state';
import { castArray } from 'lodash';

@Injectable()
export class AccountReportsPageFacade {
  public get isLoading$(): Observable<boolean> {
    return this.componentStore.select((state) => state.isLoading);
  }

  public get items$(): Observable<Array<Report>> {
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

  public get paginationId$(): Observable<string> {
    return this.componentStore.select((state) => state.paginationId);
  }

  public get parameters$(): Observable<AccountReportsQueryParameters> {
    return this.componentStore.select((state) => ({
      page: state.page,
      perPage: state.perPage,
      orderBy: state.orderBy,
      desc: state.desc,
      title: state.filterFormState.value.title,
      type: unbox(state.filterFormState.value.type),
      createdAt: state.filterFormState.value.createdAt
    }));
  }

  public get relations$(): Observable<Array<ReportRelationType>> {
    return this.componentStore.select((state) => state.relations);
  }

  public get filterFormState$(): Observable<FormGroupState<AccountReportsFilterForm>> {
    return this.componentStore.select((state) => state.filterFormState);
  }

  public get filterFormStateValue$(): Observable<AccountReportsFilterForm> {
    return this.componentStore.select((state) => state.filterFormState.value);
  }

  public get filters$(): Observable<ReportFilters> {
    return this.filterFormStateValue$
      .pipe(
        map((filterFormStateValue) => new ReportFilters({
          title: filterFormStateValue?.title || undefined,
          type: (unbox(filterFormStateValue.type).length) ? unbox(filterFormStateValue.type) : undefined,
          createdAt: filterFormStateValue?.createdAt || undefined
        }))
      );
  }

  public get filterValues$(): Observable<Array<FilterValue>> {
    return this.componentStore.select((state) => {
      const formState = state.filterFormState;
      const filterValues = [];

      if (formState.value.title) {
        filterValues.push(this.createFilterValue(formState.controls.title));
      }
      unbox(formState.value.type).forEach((value) =>
        filterValues.push(new FilterValue({ id: formState.controls.type.id, value }))
      );
      if (formState.value.createdAt) {
        filterValues.push(new FilterValue({
          id: formState.controls.createdAt.id,
          value: DateTime.fromISO(formState.value.createdAt).toFormat(configuration.dateFormats.filterDate)
        }));
      }

      return filterValues;
    });
  }

  private loadItemsEffect$: () => Observable<void>;
  private loadItemsByParametersEffect$: (page?: number) => Observable<void>;
  private loadItemsByPageEffect$: (page: number) => Observable<void>;
  private downloadMediaEffect$: (media: Media) => Observable<void>;

  constructor(
    private readonly componentStore: ComponentStore<AccountReportsPageState>,
    private readonly store: Store<AppState>,
    private readonly reportService: ReportService,
    private readonly mediaService: MediaService,
    private readonly fileService: FileService
  ) {
    this.resetState();

    this.registerLoadItemsEffect();
    this.registerLoadItemsByParametersEffect();
    this.registerLoadItemsByPageEffect();
    this.registerDownloadMediaEffect();
  }

  public resetState(): void {
    this.componentStore.setState(new AccountReportsPageState());
  }

  public loadItems(): void {
    this.loadItemsEffect$();
  }

  public loadItemsByParameters(page?: number): void {
    this.loadItemsByParametersEffect$(page);
  }

  public loadItemsByPage(page: number): void {
    this.loadItemsByPageEffect$(page);
  }

  public changeSort(parameters: AccountReportsQueryParameters): void {
    this.updateStateSort(parameters);
    this.loadItemsByParameters();
  }

  public downloadMedia(media: Media): void {
    this.downloadMediaEffect$(media);
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

  private updateItems(response: PaginationResponse<Report>): void {
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

  private updateStateSort(parameters: AccountReportsQueryParameters): void {
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

  private updateQueryParameters(parameters: AccountReportsQueryParameters): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        orderBy: parameters.orderBy || state.orderBy,
        desc: (parameters.desc !== undefined) ? parameters.desc : state.desc,
        page: parameters.page || state.page,
        filterFormState: updateGroup<AccountReportsFilterForm>(
          state.filterFormState,
          {
            type: setValue((parameters.type) ? box(parameters.type) : state.filterFormState.value.type),
            title: setValue(parameters.title || state.filterFormState.value.title),
            createdAt: setValue(parameters.createdAt || state.filterFormState.value.createdAt)
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

          const parameters = new AccountReportsQueryParameters({
            page: (queryParams.page) ? parseInt(queryParams.page, 10) : undefined,
            orderBy: queryParams.orderBy || undefined,
            desc: (queryParams.desc !== undefined) ? queryParams.desc === 'true' : undefined,
            title: queryParams.title || undefined,
            type: (queryParams.type) ? castArray(queryParams.type) : undefined,
            createdAt: queryParams.createdAt || undefined
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
    this.loadItemsByParametersEffect$ = this.componentStore.effect((origin$: Observable<number>) =>
      origin$.pipe(
        withLatestFrom(
          this.parameters$,
          this.relations$,
          this.filters$
        ),
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
              title: filters.title,
              type: filters.type,
              createdAt: filters.createdAt
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
    orderBy: ReportSortField,
    desc: boolean,
    relations: Array<ReportRelationType>,
    filters: ReportFilters
  }): Observable<any> {
    return this.reportService
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

  private registerDownloadMediaEffect(): void {
    this.downloadMediaEffect$ = this.componentStore.effect((origin$: Observable<Media>) =>
      origin$.pipe(
        exhaustMap((media) =>
          this.mediaService
            .getBlob(media.id)
            .pipe(
              tap((response) => this.fileService.saveFile(response, media.name))
            )
        )
      )
    );
  }
}
