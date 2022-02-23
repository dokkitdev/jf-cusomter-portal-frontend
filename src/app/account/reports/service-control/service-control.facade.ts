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
import { NavigationActions, NavigationSelectors } from '@shared/navigation';
import { configuration } from '@configurations';
import { FileService } from '@shared/file';
import { NotificationService } from '@shared/notification';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';

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

  public exportCSV(): void {
    this.exportCSVEffect$();
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

            this.store.dispatch(NavigationActions.mergeQueryParams({
              queryParams: { page, orderBy, desc }
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
