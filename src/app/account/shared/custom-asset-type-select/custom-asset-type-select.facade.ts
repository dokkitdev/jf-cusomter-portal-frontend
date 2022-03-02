import { unionBy } from 'lodash';
import { AccountCustomAssetTypeSelectState } from './custom-asset-type-select.state';
import { map, Observable, switchMap } from 'rxjs';
import { Injectable } from '@angular/core';
import { CustomAssetType, AssetService } from '@shared/asset';
import { FormControlState } from 'ngrx-forms';
import { CustomSelectOption } from '@shared/custom-select';
import { ComponentStore, tapResponse } from '@ngrx/component-store';

@Injectable()
export class AccountCustomAssetTypeSelectFacade {
  public get items$(): Observable<Array<CustomAssetType>> {
    return this.componentStore.select((state) => state.items);
  }

  public get isLoading$(): Observable<boolean> {
    return this.componentStore.select((state) => state.isLoading);
  }

  public get controlState$(): Observable<FormControlState<number>> {
    return this.componentStore.select((state) => state.controlState);
  }

  public get options$(): Observable<Array<CustomSelectOption<number, CustomAssetType>>> {
    return this.items$
      .pipe(
        map((items) =>
          items.map((item) =>
            new CustomSelectOption<number>({
              id: item.id,
              title: item.name,
              data: item
            })
          )
        )
      );
  }

  private loadItemsByParametersEffect$: () => Observable<void>;

  constructor(
    private readonly componentStore: ComponentStore<AccountCustomAssetTypeSelectState>,
    private readonly assetService: AssetService
  ) {
    this.resetState();
    this.registerLoadItemsByParametersEffect();
  }

  public resetState(): void {
    this.componentStore.setState(new AccountCustomAssetTypeSelectState());
  }

  public setInitialItem(assetType: CustomAssetType): void {
    if (assetType?.id) {
      this.updateStateItems([assetType]);
    }
  }

  public loadItemsByParameters(): void {
    this.loadItemsByParametersEffect$();
  }

  public setControlState(controlState: FormControlState<number>): void {
    this.updateControlState(controlState);
  }

  private updateControlState(controlState: FormControlState<number>): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        controlState
      })
    )();
  }

  private updateStateItems(items: Array<CustomAssetType> = []): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        items: unionBy(state.items, items, 'id')
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

  private registerLoadItemsByParametersEffect(): void {
    this.loadItemsByParametersEffect$ = this.componentStore.effect((origin$) =>
      origin$.pipe(
        switchMap(() => {
          this.updateIsLoading(true);

          return this.assetService
            .searchCustomAssetTypes()
            .pipe(
              tapResponse(
                (items) => {
                  this.updateIsLoading(false);
                  this.updateStateItems(items);
                },
                () => this.updateIsLoading(false)
              )
            );
        })
      )
    );
  }
}
