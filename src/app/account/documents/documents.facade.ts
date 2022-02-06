import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '@shared/store';
import { Document, DocumentFilters, DocumentRelationType, DocumentService, DocumentSortField } from '@shared/document';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { AccountDocumentsPageState } from './documents.state';
import { AccountDocumentsQueryParameters } from './shared/models';
import { PaginationResponse } from '@shared/pagination';
import { exhaustMap, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { NavigationActions, NavigationSelectors } from '@shared/navigation';
import { Media, MediaService } from '@shared/media';
import { FileService } from '@shared/file';
import { Actions, FormControlState, formGroupReducer, FormGroupState, setValue, SetValueAction, updateGroup } from 'ngrx-forms';
import { AccountDocumentsFilterForm } from './shared/forms';
import { FilterValue } from '@shared/filter-values';
import { DateTime } from 'luxon';
import { configuration } from '@configurations';
import { getEndDateFilter, getStartDateFilter } from '@shared/form-datepicker';

@Injectable()
export class AccountDocumentsPageFacade {
  public get isLoading$(): Observable<boolean> {
    return this.componentStore.select((state) => state.isLoading);
  }

  public get isLoadingToPage$(): Observable<boolean> {
    return this.componentStore.select((state) => state.isLoadingToPage);
  }

  public get hasMoreItems$(): Observable<boolean> {
    return this.componentStore.select((state) => state.totalItems > state.items.length);
  }

  public get items$(): Observable<Array<Document>> {
    return this.componentStore.select((state) => state.items);
  }

  public get parameters$(): Observable<AccountDocumentsQueryParameters> {
    return this.componentStore.select((state) => ({
      page: state.page,
      perPage: state.perPage,
      orderBy: state.orderBy,
      desc: state.desc,
      title: state.filterFormState.value.title,
      query: state.filterFormState.value.query,
      createdAtFrom: state.filterFormState.value.createdAtFrom,
      createdAtTo: state.filterFormState.value.createdAtTo
    }));
  }

  public get relations$(): Observable<Array<DocumentRelationType>> {
    return this.componentStore.select((state) => state.relations);
  }

  public get filterFormState$(): Observable<FormGroupState<AccountDocumentsFilterForm>> {
    return this.componentStore.select((state) => state.filterFormState);
  }

  public get filterFormStateValue$(): Observable<AccountDocumentsFilterForm> {
    return this.componentStore.select((state) => state.filterFormState.value);
  }

  public get filters$(): Observable<DocumentFilters> {
    return this
      .filterFormStateValue$
      .pipe(
        map((filterFormStateValue) => new DocumentFilters({
          title: filterFormStateValue.title || undefined,
          query: filterFormStateValue.query || undefined,
          createdAtFrom: filterFormStateValue.createdAtFrom || undefined,
          createdAtTo: filterFormStateValue.createdAtTo || undefined
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
      if (formState.value.query) {
        filterValues.push(this.createFilterValue(formState.controls.query));
      }
      if (formState.value.createdAtFrom) {
        filterValues.push(new FilterValue({
          id: formState.controls.createdAtFrom.id,
          value: DateTime.fromISO(formState.value.createdAtFrom).toFormat(configuration.dateFormats.filterDate)
        }));
      }
      if (formState.value.createdAtTo) {
        filterValues.push(new FilterValue({
          id: formState.controls.createdAtTo.id,
          value: DateTime.fromISO(formState.value.createdAtTo).toFormat(configuration.dateFormats.filterDate)
        }));
      }

      return filterValues;
    });
  }

  private loadItemsEffect$: () => Observable<void>;
  private loadItemsByParametersEffect$: (page?: number) => Observable<void>;
  private loadNextPageEffect$: () => Observable<void>;
  private loadItemsToPageEffect$: () => Observable<void>;
  private viewMediaEffect$: (media: Media) => Observable<void>;
  private downloadMediaEffect$: (media: Media) => Observable<void>;

  constructor(
    private readonly componentStore: ComponentStore<AccountDocumentsPageState>,
    private readonly store: Store<AppState>,
    private readonly documentService: DocumentService,
    private readonly mediaService: MediaService,
    private readonly fileService: FileService
  ) {
    this.resetState();

    this.registerLoadItemsEffect();
    this.registerLoadItemsByParametersEffect();
    this.registerLoadNextPageEffect();
    this.registerLoadItemsToPageEffect();
    this.registerViewMediaEffect();
    this.registerDownloadMediaEffect();
  }

  public resetState(): void {
    this.componentStore.setState(new AccountDocumentsPageState());
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

  public changeSort(parameters: AccountDocumentsQueryParameters): void {
    this.updateStateSort(parameters);
    this.loadItemsByParameters();
  }

  public viewMedia(media: Media): void {
    this.viewMediaEffect$(media);
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

  public getStartCreatedAtFilter$(): Observable<(date: Date) => boolean> {
    return this
      .filterFormState$
      .pipe(
        map((formState) => getStartDateFilter(formState.value.createdAtTo))
      );
  }

  public getEndCreatedAtFilter$(): Observable<(date: Date) => boolean> {
    return this
      .filterFormState$
      .pipe(
        map((formState) => getEndDateFilter(formState.value.createdAtFrom))
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

  private updateIsLoadingToPage(value: boolean): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        isLoadingToPage: value
      })
    )();
  }

  private updateItems(response: PaginationResponse<Document>): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        items: [...state.items, ...response.items],
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

  private updateNextPage(): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        page: state.page + 1
      })
    )();
  }

  private updateStateSort(parameters: AccountDocumentsQueryParameters): void {
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

  private updateQueryParameters(parameters: AccountDocumentsQueryParameters): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        orderBy: parameters.orderBy || state.orderBy,
        desc: parameters.desc || state.desc,
        page: parameters.page || state.page,
        filterFormState: updateGroup<AccountDocumentsFilterForm>(
          state.filterFormState,
          {
            query: setValue(parameters.query || state.filterFormState.value.query),
            title: setValue(parameters.title || state.filterFormState.value.title),
            createdAtFrom: setValue(parameters.createdAtFrom || state.filterFormState.value.createdAtFrom),
            createdAtTo: setValue(parameters.createdAtTo || state.filterFormState.value.createdAtTo)
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

          const parameters = new AccountDocumentsQueryParameters({
            page: (queryParams.page) ? parseInt(queryParams.page, 10) : undefined,
            orderBy: queryParams.orderBy || undefined,
            desc: queryParams.desc === 'true',
            title: queryParams.title || undefined,
            query: queryParams.query || undefined,
            createdAtFrom: queryParams.createdAtFrom || undefined,
            createdAtTo: queryParams.createdAtTo || undefined
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
                title: filters.title,
                query: filters.query,
                createdAtFrom: filters.createdAtFrom,
                createdAtTo: filters.createdAtTo
              }
            }));
          }

          this.updateIsLoading(true);

          return this.tryLoadItemsByParameters({ page, perPage, orderBy, desc, relations, filters });
        })
      )
    );
  }

  private tryLoadItemsByParameters({ page, perPage, orderBy, desc, relations, filters }: {
    page: number,
    perPage: number,
    orderBy: DocumentSortField,
    desc: boolean,
    relations: Array<DocumentRelationType>,
    filters: DocumentFilters
  }): Observable<any> {
    return this.documentService
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
            this.updateQueryParameters(new AccountDocumentsQueryParameters({ page: response.currentPage }));
            this.store.dispatch(NavigationActions.mergeQueryParams({
              queryParams: { page: response.currentPage }
            }));
          },
          () => this.updateIsLoading(true)
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

  private registerViewMediaEffect(): void {
    this.viewMediaEffect$ = this.componentStore.effect((origin$: Observable<Media>) =>
      origin$.pipe(
        exhaustMap((media) =>
          this.mediaService
            .getBlob(media.id)
            .pipe(
              tap((response) => this.fileService.openInNewTab(response))
            )
        )
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
