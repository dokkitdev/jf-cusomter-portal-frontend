import { tap, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Asset, AssetService } from '@shared/asset';
import { AccountReportsServiceControlState } from './service-control.state';
import { ComponentStore } from '@ngrx/component-store';
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

  private registerLoadItemsEffect(): void {
    this.loadItemsEffect$ = this.componentStore.effect((origin$: Observable<void>) =>
      origin$
        .pipe(
          switchMap(() => this.tryToLoadItems())
        )
    );
  }

  private tryToLoadItems(): Observable<PaginationResponse<Asset>> {
    return this.assetService
      .search()
      .pipe(
        tap((response) => console.log(response))
      );
  }
}
