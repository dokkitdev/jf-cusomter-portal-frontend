import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { AssetTest } from '@shared/asset';
import { DialogService } from '@shared/dialog';
import { orderBy } from 'lodash';
import { Observable } from 'rxjs';
import { AccountAssetTestsQueryParameters } from './models';
import { AccountAssetTestsComponentState } from './asset-tests.state';
import { AccountDialogViewAssetTestReadingsComponent, AccountDialogViewAssetTestReadingsData } from '../dialog-view-asset-test-readings';
import { map } from 'rxjs/operators';

@Injectable()
export class AccountAssetTestsComponentFacade {
  public get sortedItems$(): Observable<Array<AssetTest>> {
    return this.componentStore.select((state) => orderBy(state.items, state.orderBy, (state.desc) ? 'desc' : 'asc'));
  }

  public get parameters$(): Observable<AccountAssetTestsQueryParameters> {
    return this.componentStore.select((state) => ({
      orderBy: state.orderBy,
      desc: state.desc
    }));
  }

  private openViewReadingsDialogEffect$: (item: AssetTest) => Observable<void>;

  constructor(
    private readonly componentStore: ComponentStore<AccountAssetTestsComponentState>,
    private readonly dialogService: DialogService
  ) {
    this.resetState();

    this.registerOpenViewReadingsDialogEffect();
  }

  public resetState(): void {
    this.componentStore.setState(new AccountAssetTestsComponentState());
  }

  public setItems(items: Array<AssetTest>): void {
    this.updateItems(items);
  }

  public openViewReadingsDialog(item: AssetTest): void {
    this.openViewReadingsDialogEffect$(item);
  }

  public changeSort(parameters: AccountAssetTestsQueryParameters): void {
    this.updateStateSort(parameters);
  }

  private updateItems(items: Array<AssetTest>): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        items
      })
    )();
  }

  private updateStateSort(parameters: AccountAssetTestsQueryParameters): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        orderBy: parameters.orderBy,
        desc: parameters.desc
      })
    )();
  }

  private registerOpenViewReadingsDialogEffect(): void {
    this.openViewReadingsDialogEffect$ = this.componentStore.effect((origin$: Observable<AssetTest>) =>
      origin$.pipe(
        map((assetTest) => this.dialogService.open(AccountDialogViewAssetTestReadingsComponent, {
          autoFocus: false,
          data: new AccountDialogViewAssetTestReadingsData({ readings: assetTest.readings })
        }))
      )
    );
  }
}
