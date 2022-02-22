import { concatLatestFrom } from '@ngrx/effects';
import { AccountReportsServiceControlQueryParameters } from './shared/models/query-parameters';
import { switchMap } from 'rxjs/operators';
import { Observable, tap } from 'rxjs';
import { Asset, AssetRelationType, AssetService, AssetSortField, AssetFilters } from '@shared/asset';
import { AccountReportsServiceControlState } from './service-control.state';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Injectable } from '@angular/core';
import { PaginationResponse } from '@shared/pagination';
import { AppState } from '@shared/store';
import { Store } from '@ngrx/store';
import { NavigationSelectors } from '@shared/navigation';

@Injectable()
export class AccountReportsServiceControlFacade {
  public get isLoading$(): Observable<boolean> {
    return this.componentStore.select((state) => state.isLoading);
  }

  public get items$(): Observable<Array<Asset>> {
    return this.componentStore.select((state) => state.items);
  };

  public get paginationId$(): Observable<string> {
    return this.componentStore.select((state) => state.paginationId);
  };

  public get parameters$(): Observable<AccountReportsServiceControlQueryParameters> {
    return this.componentStore.select((state) => ({
      page: state.page,
      perPage: state.perPage,
      orderBy: state.orderBy,
      desc: state.desc
    }));
  }

  public get filters$(): Observable<AssetFilters> {
    return this.componentStore.select((state) => state.filters);
  }

  public get relations$(): Observable<Array<AssetRelationType>> {
    return this.componentStore.select((state) => state.relations);
  }

  private loadItemsEffect$: () => Observable<void>;
  private loadItemsByParametersEffect$: (page?: number) => Observable<void>;
  private loadItemsByPageEffect$: (page?: number) => Observable<void>;

  constructor(
    private readonly componentStore: ComponentStore<AccountReportsServiceControlState>,
    private readonly store: Store<AppState>,
    private readonly assetService: AssetService
  ) {
    this.resetState();

    this.registerLoadItemsEffect();
    this.registerLoadItemsByParametersEffect();
    this.registerLoadItemsByPageEffect();
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

  private updateIsLoading(isLoading: boolean): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        isLoading
      })
    )();
  }

  private updateItems(items: Array<Asset>): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        items
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
        page: parameters.page || state.page
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
    this.updateItems(response.items);
  }

  private onLoadItemsError(error: Error): void {
    this.updateIsLoading(false);
  }
}
