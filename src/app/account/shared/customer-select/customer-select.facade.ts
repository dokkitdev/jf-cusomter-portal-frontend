import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { tapResponse } from '@ngrx/operators';
import { AccountCustomerSelectComponentState } from './customer-select.state';
import { combineLatest, EMPTY, Observable } from 'rxjs';
import { Customer, CustomerFilters, CustomerService } from '@shared/customer';
import { CustomSelectOption } from '@shared/custom-select';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { CustomerQueryParameters } from './models';
import { unionBy } from 'lodash';
import { TranslateService } from '@ngx-translate/core';
import { FormControlState } from 'ngrx-forms';

@Injectable()
export class AccountCustomerSelectComponentFacade {
  public get items$(): Observable<Array<Customer>> {
    return this.componentStore.select((state) => state.items);
  }

  public get isLoading$(): Observable<boolean> {
    return this.componentStore.select((state) => state.isLoading);
  }

  public get hasNextItems$(): Observable<boolean> {
    return this.componentStore.select((state) => state.items.length < state.totalItems);
  }

  public get filters$(): Observable<CustomerFilters> {
    return this.componentStore.select((state) => state.filters);
  }

  public get parameters$(): Observable<CustomerQueryParameters> {
    return this.componentStore.select((state) => new CustomerQueryParameters({
      page: state.page,
      perPage: state.perPage,
      orderBy: state.orderBy,
      desc: state.desc
    }));
  }

  public get controlState$(): Observable<FormControlState<number>> {
    return this.componentStore.select((state) => state.controlState);
  }

  public get excludeID$(): Observable<Array<number>> {
    return this.componentStore.select((state) => state.excludeID);
  }

  public get idField$(): Observable<keyof Customer> {
    return this.componentStore.select((state) => state.idField);
  }

  public get options$(): Observable<Array<CustomSelectOption<number | string>>> {
    return combineLatest([
      this.items$,
      this.excludeID$,
      this.controlState$,
      this.idField$
    ])
    .pipe(
      map(([items, excludeID, controlState, idField]) =>
        items
          .filter((item) => !excludeID.includes(item.id) || controlState.value === item.id)
          .map((item) =>
            new CustomSelectOption<number | string>({
              id: item[idField],
              title: this.translateService.instant('ACCOUNT.SHARED.CUSTOMER_SELECT.TEXT_ITEM', {
                name: item.name,
                id: item.customerID
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
    private readonly componentStore: ComponentStore<AccountCustomerSelectComponentState>,
    private readonly customerService: CustomerService,
    private readonly translateService: TranslateService
  ) {
    this.resetState();
    this.registerLoadItemsByParametersEffect();
    this.registerLoadInitialItemEffect();
  }

  public resetState(): void {
    this.componentStore.setState(new AccountCustomerSelectComponentState());
  }

  public setInitialItem(customer: Customer): void {
    if (customer?.id) {
      this.updateStateItems([customer]);
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
    this.updateFilters(new CustomerFilters({ query }));
    this.loadItemsByParameters();
  }

  public setControlState(controlState: FormControlState<number>): void {
    this.updateControlState(controlState);
  }

  public setExcludeID(value: Array<number>): void {
    this.updateExcludeID(value);
  }

  public setIDField(value: keyof Customer): void {
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

  private updateStateItems(items: Array<Customer> = [], totalItems: number = 0): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        items: unionBy(state.items, items, 'id'),
        totalItems
      })
    )();
  }

  private addItem(item: Customer): void {
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

  private updateFilters(filters: CustomerFilters): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        filters,
        items: [],
        page: 1
      })
    )();
  }

  private updateExcludeID(excludeID: Array<number>): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        excludeID
      })
    )();
  }

  private updateIDField(idField: keyof Customer): void {
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
        withLatestFrom(
          this.parameters$,
          this.filters$
        ),
        switchMap(([_, parameters, filters]) => {
          this.updateIsLoading(true);

          return this.customerService
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
        withLatestFrom(
          this.controlState$
        ),
        switchMap(([_, controlState]) => (controlState.value)
          ? this.tryToLoadItem(controlState.value)
          : EMPTY
        )
      )
    );
  }

  private tryToLoadItem(id: number): Observable<Customer> {
    return this.customerService
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
