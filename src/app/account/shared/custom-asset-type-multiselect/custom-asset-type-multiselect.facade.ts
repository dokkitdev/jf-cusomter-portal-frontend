import { AccountCustomAssetTypeMultiselectComponentState } from './custom-asset-type-multiselect.state';
import { AssetService } from '@shared/asset';
import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Observable, Subject } from 'rxjs';
import { CustomSelectOption } from '@shared/custom-select/models';
import { map, switchMap } from 'rxjs/operators';
import { Actions } from 'ngrx-forms';

@Injectable()
export class AccountCustomAssetTypeMultiselectComponentFacade {
  public get items$(): Observable<Array<string>> {
    return this.componentStore.select((state) => state.items);
  }

  public get isLoading$(): Observable<boolean> {
    return this.componentStore.select((state) => state.isLoading);
  }

  public get options$(): Observable<Array<CustomSelectOption<string>>> {
    return this.items$.pipe(
      map((items) => items.map((item) =>
        new CustomSelectOption({
          id: item,
          title: item
        }))
      )
    );
  }

  public controlStateActionTriggered: Subject<Actions<any>>;

  private loadItemsEffect$: () => Observable<void>;

  constructor(
    private readonly componentStore: ComponentStore<AccountCustomAssetTypeMultiselectComponentState>,
    private readonly assetService: AssetService
  ) {
    this.controlStateActionTriggered = new Subject();

    this.resetState();
    this.registerLoadItemsEffect();
  }

  public resetState(): void {
    this.componentStore.setState(new AccountCustomAssetTypeMultiselectComponentState());
  }

  public loadItems(): void {
    this.loadItemsEffect$();
  }

  private updateStateItems(items: Array<string> = []): void {
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
            .getCustomAssetTypes()
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
