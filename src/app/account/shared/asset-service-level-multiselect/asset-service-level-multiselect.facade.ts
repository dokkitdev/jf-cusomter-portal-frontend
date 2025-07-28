import { Injectable } from '@angular/core';
import { CustomSelectOption } from '@shared/custom-select/models';
import { AssetService, AssetServiceLevel } from '@shared/asset';
import { Observable } from 'rxjs';
import { ComponentStore } from '@ngrx/component-store';
import { tapResponse } from '@ngrx/operators';
import { map, switchMap } from 'rxjs/operators';
import { AccountAssetServiceLevelMultiselectComponentState } from './asset-service-level-multiselect.state';

@Injectable()
export class AccountAssetServiceLevelMultiselectComponentFacade {
  public get items$(): Observable<Array<AssetServiceLevel>> {
    return this.componentStore.select((state) => state.items);
  }

  public get isLoading$(): Observable<boolean> {
    return this.componentStore.select((state) => state.isLoading);
  }

  public get options$(): Observable<Array<CustomSelectOption<string>>> {
    return this.items$.pipe(
      map((items) => items.map((item) =>
        new CustomSelectOption({
          id: item.name,
          title: item.name
        }))
      )
    );
  }

  private loadItemsEffect$: () => Observable<void>;

  constructor(
    private readonly componentStore: ComponentStore<AccountAssetServiceLevelMultiselectComponentState>,
    private readonly assetService: AssetService
  ) {
    this.resetState();
    this.registerLoadItemsEffect();
  }

  public resetState(): void {
    this.componentStore.setState(new AccountAssetServiceLevelMultiselectComponentState());
  }

  public loadItems(): void {
    this.loadItemsEffect$();
  }

  private updateStateItems(items: Array<AssetServiceLevel> = []): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        items
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

  private registerLoadItemsEffect(): void {
    this.loadItemsEffect$ = this.componentStore.effect((origin$) =>
      origin$.pipe(
        switchMap(() => {
          this.updateIsLoading(true);

          return this.assetService
            .getServiceLevels()
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
