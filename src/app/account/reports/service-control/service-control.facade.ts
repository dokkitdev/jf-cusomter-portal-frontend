import { AccountReportsServiceControlQueryParameters } from './shared/models/query-parameters';
import { tap, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Asset, AssetRelationType, AssetService, AssetSortField, AssetFilters } from '@shared/asset';
import { AccountReportsServiceControlState } from './service-control.state';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Injectable } from '@angular/core';
import { PaginationResponse } from '@shared/pagination';

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

  private loadItemsEffect$: () => Observable<void>;

  constructor(
    private readonly componentStore: ComponentStore<AccountReportsServiceControlState>,
    private readonly assetService: AssetService
  ) {
    this.resetState();

    this.registerLoadItemsEffect();
  }

  public resetState(): void {
    this.componentStore.setState(new AccountReportsServiceControlState());
  }

  public loadItems(): void {
    this.loadItemsEffect$();
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

  private registerLoadItemsEffect(): void {
    this.loadItemsEffect$ = this.componentStore.effect((origin$: Observable<void>) =>
      origin$
        .pipe(
          tap(() => this.updateIsLoading(true)),
          switchMap(() => this.tryLoadItemsByParameters())
        )
    );
  }

  private tryLoadItemsByParameters({ page, perPage, orderBy, desc, relations, filters }: {
    page: number,
    perPage: number,
    orderBy: AssetSortField,
    desc: boolean,
    relations: AssetRelationType,
    filters: AssetFilters
  }): Observable<PaginationResponse<Asset>> {
    return this.assetService
      .search()
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
