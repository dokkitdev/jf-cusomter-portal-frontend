import { Injectable } from '@angular/core';
import { AccountDialogEditUserActions, AccountDialogEditUserComponent } from '@app/account/shared/dialog-edit-user';
import { ComponentStore } from '@ngrx/component-store';
import { tapResponse } from '@ngrx/operators';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Customer } from '@shared/customer';
import { DialogService } from '@shared/dialog';
import { FilterValue } from '@shared/filter-values';
import { NavigationActions, NavigationSelectors } from '@shared/navigation';
import { PaginationResponse } from '@shared/pagination';
import { AppState } from '@shared/store';
import { User, UserFilters, UserRelationType, UserService, UserSortField } from '@shared/user';
import { filter as filterArray, findIndex } from 'lodash';
import {
  Actions as FormActions,
  FormControlState,
  formGroupReducer,
  FormGroupState,
  setValue,
  SetValueAction,
  updateGroup
} from 'ngrx-forms';
import { Observable } from 'rxjs';
import { map, mergeMap, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { AccountAdminUsersFilterForm } from './shared/forms';
import { AccountAdminUsersQueryParameters } from './shared/models';
import { AccountAdminUsersPageState } from './users.state';

@Injectable()
export class AccountAdminUsersPageFacade {
  public get isLoading$(): Observable<boolean> {
    return this.componentStore.select((state) => state.isLoading);
  }

  public get items$(): Observable<Array<User>> {
    return this.componentStore.select((state) => state.items);
  }

  public get perPage$(): Observable<number> {
    return this.componentStore.select((state) => state.perPage);
  }

  public get currentPage$(): Observable<number> {
    return this.componentStore.select((state) => state.page);
  }

  public get totalItems$(): Observable<number> {
    return this.componentStore.select((state) => state.totalItems);
  }

  public get hasPagination$(): Observable<boolean> {
    return this.componentStore.select((state) => state.totalItems > 0);
  }

  public get paginationId$(): Observable<string> {
    return this.componentStore.select((state) => state.paginationId);
  }

  public get parameters$(): Observable<AccountAdminUsersQueryParameters> {
    return this.componentStore.select((state) => ({
      page: state.page,
      perPage: state.perPage,
      orderBy: state.orderBy,
      desc: state.desc,
      name: state.filterFormState.value.name,
      email: state.filterFormState.value.email,
      simproCustomerID: state.filterFormState.value.simproCustomerID
    }));
  }

  public get relations$(): Observable<Array<UserRelationType>> {
    return this.componentStore.select((state) => state.relations);
  }

  public get filterFormState$(): Observable<FormGroupState<AccountAdminUsersFilterForm>> {
    return this.componentStore.select((state) => state.filterFormState);
  }

  public get filterFormStateValue$(): Observable<AccountAdminUsersFilterForm> {
    return this.componentStore.select((state) => state.filterFormState.value);
  }

  public get filters$(): Observable<UserFilters> {
    return this.filterFormStateValue$.pipe(
      map(
        (filterFormStateValue) =>
          new UserFilters({
            customerIds: filterFormStateValue.simproCustomerID ? [filterFormStateValue.simproCustomerID] : undefined,
            name: filterFormStateValue.name || undefined,
            email: filterFormStateValue.email || undefined
          })
      )
    );
  }

  public get filterValues$(): Observable<Array<FilterValue>> {
    return this.componentStore.select((state) => {
      const formState = state.filterFormState;
      const filterValues = [];

      if (formState.value.name) {
        filterValues.push(this.createFilterValue(formState.controls.name));
      }
      if (formState.value.email) {
        filterValues.push(this.createFilterValue(formState.controls.email));
      }
      if (formState.value.simproCustomerID && state.selectedCustomer) {
        filterValues.push(
          new FilterValue({
            id: formState.controls.simproCustomerID.id,
            value: state.selectedCustomer.name
          })
        );
      }

      return filterValues;
    });
  }

  private loadItemsEffect$: () => Observable<void>;
  private loadItemsByParametersEffect$: (page?: number) => Observable<void>;
  private loadItemsByPageEffect$: (page?: number) => Observable<void>;
  private openCreateUserDialogEffect$: () => Observable<void>;

  constructor(
    private readonly componentStore: ComponentStore<AccountAdminUsersPageState>,
    private readonly store: Store<AppState>,
    private readonly actions$: Actions,
    private readonly userService: UserService,
    private readonly dialogService: DialogService
  ) {
    this.resetState();

    this.registerLoadItemsEffect();
    this.registerLoadItemsByParametersEffect();
    this.registerLoadItemsByPageEffect();
    this.registerOpenCreateUserDialogEffect();
    this.registerAddCreatedItemEffect();
    this.registerChangeUpdatedItemEffect();
  }

  public resetState(): void {
    this.componentStore.setState(new AccountAdminUsersPageState());
  }

  public loadItems(): void {
    this.loadItemsEffect$();
  }

  public loadItemsByPage(page: number): void {
    this.loadItemsByPageEffect$(page);
  }

  public loadItemsByParameters(page?: number): void {
    this.loadItemsByParametersEffect$(page);
  }

  public changeSort(parameters: AccountAdminUsersQueryParameters): void {
    this.updateStateSort(parameters);
    this.loadItemsByParameters();
  }

  public deleteItem(id: number): void {
    this.deleteItemFromList(id);
  }

  public createItem(): void {
    this.openCreateUserDialogEffect$();
  }

  public handleFormStateAction(action: FormActions<any>): void {
    this.updateFormState(action);

    if (action instanceof SetValueAction) {
      this.resetPagination();
      this.loadItemsByParameters();
    }
  }

  public removeFilter(filter: FilterValue): void {
    this.handleFormStateAction(new SetValueAction(filter.id, undefined));
  }

  public setSelectedCustomer(customer: Customer): void {
    this.updateSelectedCustomer(customer);
  }

  private createFilterValue(control: FormControlState<string | number | undefined>): FilterValue {
    return new FilterValue({ id: control.id, value: control.value });
  }

  private updateFormState(action: FormActions<any>): void {
    this.componentStore.updater((state) => ({
      ...state,
      filterFormState: formGroupReducer(state.filterFormState, action)
    }))();
  }

  private updateIsLoading(value: boolean): void {
    this.componentStore.updater((state) => ({
      ...state,
      isLoading: value
    }))();
  }

  private updateItems(response: PaginationResponse<User>): void {
    this.componentStore.updater((state) => ({
      ...state,
      items: response.items,
      totalItems: response.totalItems
    }))();
  }

  private deleteItemFromList(id: number): void {
    this.componentStore.updater((state) => ({
      ...state,
      items: filterArray(state.items, (item) => item.id !== id),
      totalItems: state.totalItems - 1
    }))();
  }

  private addItemToList(user: User): void {
    this.componentStore.updater((state) => ({
      ...state,
      items: [user, ...state.items],
      totalItems: state.totalItems + 1
    }))();
  }

  private updateItemInList(user: User): void {
    this.componentStore.updater((state) => ({
      ...state,
      items: (() => {
        const index = findIndex(state.items, { id: user.id });

        return index !== -1 ? [...state.items.slice(0, index), user, ...state.items.slice(index + 1)] : state.items;
      })()
    }))();
  }

  private updateSelectedCustomer(customer: Customer): void {
    this.componentStore.updater((state) => ({
      ...state,
      selectedCustomer: customer
    }))();
  }

  private resetPagination(): void {
    this.componentStore.updater((state) => ({
      ...state,
      page: 1,
      items: [],
      totalItems: 0
    }))();
  }

  private updatePage(pageNumber: number): void {
    this.componentStore.updater((state) => ({
      ...state,
      page: pageNumber,
      items: []
    }))();
  }

  private updateStateSort(parameters: AccountAdminUsersQueryParameters): void {
    this.componentStore.updater((state) => ({
      ...state,
      orderBy: parameters.orderBy,
      desc: parameters.desc,
      page: 1,
      items: [],
      totalItems: 0
    }))();
  }

  private updateQueryParameters(parameters: AccountAdminUsersQueryParameters): void {
    this.componentStore.updater((state) => ({
      ...state,
      orderBy: parameters.orderBy || state.orderBy,
      desc: parameters.desc !== undefined ? parameters.desc : state.desc,
      page: parameters.page || state.page,
      filterFormState: updateGroup<AccountAdminUsersFilterForm>(state.filterFormState, {
        simproCustomerID: setValue(parameters.simproCustomerID || state.filterFormState.value.simproCustomerID),
        name: setValue(parameters.name || state.filterFormState.value.name),
        email: setValue(parameters.email || state.filterFormState.value.email)
      })
    }))();
  }

  private registerOpenCreateUserDialogEffect(): void {
    this.openCreateUserDialogEffect$ = this.componentStore.effect((origin$) =>
      origin$.pipe(
        map(() =>
          this.dialogService.open(AccountDialogEditUserComponent, {
            autoFocus: false
          })
        )
      )
    );
  }

  private registerLoadItemsEffect(): void {
    this.loadItemsEffect$ = this.componentStore.effect((origin$: Observable<void>) =>
      origin$.pipe(
        withLatestFrom(this.store.select(NavigationSelectors.selectQueryParams)),
        tap(([_, queryParams]) => {
          this.updateIsLoading(true);

          const parameters = new AccountAdminUsersQueryParameters({
            page: queryParams.page ? parseInt(queryParams.page, 10) : undefined,
            orderBy: queryParams.orderBy || undefined,
            desc: queryParams.desc !== undefined ? queryParams.desc === 'true' : undefined,
            simproCustomerID: queryParams.simproCustomerID ? parseInt(queryParams.simproCustomerID, 10) : undefined,
            name: queryParams.name || undefined,
            email: queryParams.email || undefined
          });

          this.updateQueryParameters(parameters);

          return parameters.page > 1 ? this.loadItemsByPage(parameters.page) : this.loadItemsByParameters();
        })
      )
    );
  }

  private registerLoadItemsByPageEffect(): void {
    this.loadItemsByPageEffect$ = this.componentStore.effect((origin$: Observable<number>) =>
      origin$.pipe(
        tap((page) => {
          this.updatePage(page);

          this.loadItemsByParameters();
        })
      )
    );
  }

  private registerLoadItemsByParametersEffect(): void {
    this.loadItemsByParametersEffect$ = this.componentStore.effect((origin$: Observable<number>) =>
      origin$.pipe(
        withLatestFrom(this.parameters$, this.relations$, this.filters$),
        switchMap(([_, parameters, relations, filters]) => {
          const { page, perPage, orderBy, desc } = parameters;

          this.store.dispatch(
            NavigationActions.mergeQueryParams({
              queryParams: {
                page,
                orderBy,
                desc,
                simproCustomerID: filters.customerIds,
                name: filters.name,
                email: filters.email
              }
            })
          );

          this.updateIsLoading(true);

          return this.tryLoadItemsByParameters({
            page,
            perPage,
            orderBy,
            desc,
            relations,
            filters
          });
        })
      )
    );
  }

  private tryLoadItemsByParameters({
    page,
    perPage,
    orderBy,
    desc,
    relations,
    filters
  }: {
    page: number;
    perPage: number;
    orderBy: UserSortField;
    desc: boolean;
    relations: Array<UserRelationType>;
    filters: UserFilters;
  }): Observable<any> {
    return this.userService
      .search({
        page,
        perPage,
        orderBy,
        desc,
        relations,
        filters
      })
      .pipe(
        tapResponse(
          (response) => {
            this.updateIsLoading(false);
            this.updateItems(response);
          },
          () => this.updateIsLoading(false)
        )
      );
  }

  private registerAddCreatedItemEffect(): void {
    this.componentStore.effect(() =>
      this.actions$.pipe(
        ofType(AccountDialogEditUserActions.createUserSuccess),
        withLatestFrom(this.relations$),
        mergeMap(([{ userID }, relations]) =>
          this.userService.get(userID, relations).pipe(tap((user) => this.addItemToList(user)))
        )
      )
    );
  }

  private registerChangeUpdatedItemEffect(): void {
    this.componentStore.effect(() =>
      this.actions$.pipe(
        ofType(AccountDialogEditUserActions.updateUserSuccess),
        withLatestFrom(this.relations$),
        mergeMap(([{ userID }, relations]) =>
          this.userService.get(userID, relations).pipe(
            withLatestFrom(this.userService.profile$),
            tap(([user, profile]) => {
              this.updateItemInList(user);

              if (user.id === profile.id) {
                this.userService.setProfile(user);
              }
            })
          )
        )
      )
    );
  }
}
