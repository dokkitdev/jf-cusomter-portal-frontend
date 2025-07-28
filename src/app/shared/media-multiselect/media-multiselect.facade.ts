import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Media } from '@shared/media';
import { ComponentStore } from '@ngrx/component-store';
import { MediaMultiselectComponentState } from './media-multiselect.state';
import { cloneDeep } from 'lodash';
import { tap } from 'rxjs/operators';
import { concatLatestFrom } from '@ngrx/operators';

@Injectable()
export class MediaMultiselectFacade {
  public get items$(): Observable<Array<Media>> {
    return this.componentStore.select((state) => state.items);
  }

  public itemsChanged: Subject<Array<Media>>;

  private itemsChangedEffect$: () => Observable<void>;

  constructor(
    private readonly componentStore: ComponentStore<MediaMultiselectComponentState>
  ) {
    this.itemsChanged = new Subject();

    this.resetState();
    this.registerItemsChangedEffect();
  }

  public resetState(): void {
    this.componentStore.setState(new MediaMultiselectComponentState());
  }

  public addFiles(files: Array<File>): void {
    this.updateItemsAppend(files.map((file) => new Media({ file })));
    this.itemsChangedEffect$();
  }

  public removeFile(index: number): void {
    this.removeItemByIndex(index);
    this.itemsChangedEffect$();
  }

  private updateItemsAppend(value: Array<Media> = []): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        items: [...state.items, ...value]
      })
    )();
  }

  private removeItemByIndex(index: number): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        items: this.removeItemFromArray(state.items, index)
      })
    )();
  }

  private removeItemFromArray<T>(array: Array<T>, index: number): Array<T> {
    const newArray = cloneDeep(array);
    newArray.splice(index, 1);

    return newArray;
  }

  private registerItemsChangedEffect(): void {
    this.itemsChangedEffect$ = this.componentStore.effect((origin$) =>
      origin$.pipe(
        concatLatestFrom(() => this.items$),
        tap(([_, items]) => this.itemsChanged.next(items))
      )
    );
  }
}
