import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { AccountSiteSelectComponentState } from './site-select.state';
import { combineLatest, EMPTY, Observable } from 'rxjs';
import { Site, SiteFilters, SiteService } from '@shared/site';
import { CustomSelectOption } from '@shared/custom-select/models';
import { map, switchMap } from 'rxjs/operators';
import { SiteQueryParameters } from './models';
import { unionBy } from 'lodash';
import { TranslateService } from '@ngx-translate/core';
import { FormControlState } from 'ngrx-forms';
import { SiteIDField } from './types';
import { tapResponse, concatLatestFrom } from '@ngrx/operators';

@Injectable()
export class AccountSiteSelectComponentFacade {
  public get items$(): Observable<Array<Site>> {
    return this.componentStore.select((state) => state.items);
  }

  public get isLoading$(): Observable<boolean> {
    return this.componentStore.select((state) => state.isLoading);
  }

  public get hasNextItems$(): Observable<boolean> {
    return this.componentStore.select((state) => state.items.length < state.totalItems);
  }

  public get filters$(): Observable<SiteFilters> {
    return this.componentStore.select((state) => state.filters);
  }

  public get parameters$(): Observable<SiteQueryParameters> {
    return this.componentStore.select((state) => new SiteQueryParameters({
      page: state.page,
      perPage: state.perPage,
      orderBy: state.orderBy,
      desc: state.desc
    }));
  }

  public get controlState$(): Observable<FormControlState<number>> {
    return this.componentStore.select((state) => state.controlState);
  }

  public get idField$(): Observable<SiteIDField> {
    return this.componentStore.select((state) => state.idField);
  }

  public get options$(): Observable<Array<CustomSelectOption<number | string, Site>>> {
    return combineLatest([
      this.items$,
      this.idField$
    ])
    .pipe(
      map(([items, idField]) =>
        items.map((item) =>
          new CustomSelectOption<number | string>({
            id: item[idField],
            title: this.translateService.instant('ACCOUNT.SHARED.SITE_SELECT.TEXT_ITEM', {
              name: item.name,
              id: item.siteID
            }),
            data: item
          })
        )
      )
    );
  }

  private loadInitialItemEffect$: () => Observable<void>;
  private loadItemsByParametersEffect$: () => Observable<void>;

  constructor(
    private readonly componentStore: ComponentStore<AccountSiteSelectComponentState>,
    private readonly siteService: SiteService,
    private readonly translateService: TranslateService
  ) {
    this.resetState();
    this.registerLoadInitialItemEffect();
    this.registerLoadItemsByParametersEffect();
  }

  public resetState(): void {
    this.componentStore.setState(new AccountSiteSelectComponentState());
  }

  public setInitialItem(site: Site): void {
    if (site?.id) {
      this.updateStateItems([site]);
    }
  }

  public loadInitialItem(): void {
    this.loadInitialItemEffect$();
  }

  public loadItemsByParameters(): void {
    this.loadItemsByParametersEffect$();
  }

  public loadNextPage(): void {
    this.updateStateNextPage();
    this.loadItemsByParameters();
  }

  public changeFilterQuery(query: string): void {
    this.updateFilters(new SiteFilters({ name: query }));
    this.loadItemsByParameters();
  }

  public setControlState(controlState: FormControlState<number>): void {
    this.updateControlState(controlState);
  }

  public setIDField(value: SiteIDField): void {
    this.updateIDField(value);
  }

  private updateControlState(controlState: FormControlState<number>): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        controlState
      })
    )();
  }

  private updateStateNextPage(): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        page: state.page + 1
      })
    )();
  }

  private updateStateItems(items: Array<Site> = [], totalItems: number = 0): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        items: unionBy(state.items, items, 'id'),
        totalItems
      })
    )();
  }

  private addItem(item: Site): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        items: unionBy(state.items, [item], 'id')
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

  private updateFilters(filters: SiteFilters): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        filters,
        items: [],
        page: 1
      })
    )();
  }

  private updateIDField(idField: SiteIDField): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        idField
      })
    )();
  }

  private registerLoadItemsByParametersEffect(): void {
    this.loadItemsByParametersEffect$ = this.componentStore.effect((origin$) =>
      origin$.pipe(
        concatLatestFrom(() => [
          this.parameters$,
          this.filters$
        ]),
        switchMap(([_, parameters, filters]) => {
          this.updateIsLoading(true);

          return this.siteService
            .search({ ...parameters, filters })
            .pipe(
              tapResponse(
                (response) => {
                  this.updateIsLoading(false);
                  this.updateStateItems(response.items, response.totalItems);
                },
                () => this.updateIsLoading(false)
              )
            );
        })
      )
    );
  }

  private registerLoadInitialItemEffect(): void {
    this.loadInitialItemEffect$ = this.componentStore.effect((origin$: Observable<number>) =>
      origin$.pipe(
        concatLatestFrom(() => this.controlState$),
        switchMap(([_, controlState]) => (controlState.value)
          ? this.tryToLoadItem(controlState.value)
          : EMPTY
        )
      )
    );
  }

  private tryToLoadItem(id: number): Observable<Site> {
    return this.siteService
      .get(id)
      .pipe(
        tapResponse(
          (item) => {
            if (item.id) {
              this.addItem(item);
            }
          },
          () =>  EMPTY
        )
      );
  }
}
