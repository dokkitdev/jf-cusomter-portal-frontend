import { AccountAssetNameMultiselectComponentState } from './asset-name-multiselect.state';
import { AssetName, AssetService } from '@shared/asset';
import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { tapResponse } from '@ngrx/operators';
import { Observable, Subject } from 'rxjs';
import { CustomSelectOption } from '@shared/custom-select/models';
import { map, switchMap } from 'rxjs/operators';
import { Actions } from 'ngrx-forms';

@Injectable()
export class AccountAssetNameMultiselectComponentFacade {
  public get items$(): Observable<Array<AssetName>> {
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

  public controlStateActionTriggered: Subject<Actions<any>>;

  private loadItemsEffect$: () => Observable<void>;

  constructor(
    private readonly componentStore: ComponentStore<AccountAssetNameMultiselectComponentState>,
    private readonly assetService: AssetService
  ) {
    this.controlStateActionTriggered = new Subject();

    this.resetState();
    this.registerLoadItemsEffect();
  }

  public resetState(): void {
    this.componentStore.setState(new AccountAssetNameMultiselectComponentState());
  }

  public loadItems(): void {
    this.loadItemsEffect$();
  }

  private updateStateItems(items: Array<AssetName> = []): void {
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
            .getAssetNames()
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
