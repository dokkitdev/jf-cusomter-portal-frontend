import { Injectable } from '@angular/core';
import {
  AccountDialogEditUserActions,
  AccountDialogEditUserComponent
} from '@app/account/shared/dialog-edit-user';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
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

  public get isLoadingToPage$(): Observable<boolean> {
    return this.componentStore.select((state) => state.isLoadingToPage);
  }

  public get hasMoreItems$(): Observable<boolean> {
    return this.componentStore.select((state) => state.totalItems > state.items.length);
  }

  public get items$(): Observable<Array<User>> {
    return this.componentStore.select((state) => state.items);
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
    return this
      .filterFormStateValue$
      .pipe(
        map((filterFormStateValue) => new UserFilters({
          simproCustomerID: filterFormStateValue.simproCustomerID || undefined,
          name: filterFormStateValue.name || undefined,
          email: filterFormStateValue.email || undefined
        }))
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
          new FilterValue({ id: formState.controls.simproCustomerID.id, value: state.selectedCustomer.name })
        );
      }

      return filterValues;
    });
  }

  private loadItemsEffect$: () => Observable<void>;
  private loadItemsByParametersEffect$: (page?: number) => Observable<void>;
  private loadNextPageEffect$: () => Observable<void>;
  private loadItemsToPageEffect$: () => Observable<void>;
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
    this.registerLoadNextPageEffect();
    this.registerLoadItemsToPageEffect();
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

  public loadItemsByParameters(page?: number): void {
    this.loadItemsByParametersEffect$(page);
  }

  public loadItemsToPage(): void {
    this.loadItemsToPageEffect$();
  }

  public loadNextPage(): void {
    this.loadNextPageEffect$();
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
    this.componentStore.updater(
      (state) => ({
        ...state,
        filterFormState: formGroupReducer(state.filterFormState, action)
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

  private updateIsLoadingToPage(value: boolean): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        isLoadingToPage: value
      })
    )();
  }

  private updateItems(response: PaginationResponse<User>): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        items: [...state.items, ...response.items],
        totalItems: response.totalItems
      })
    )();
  }

  private deleteItemFromList(id: number): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        items: filterArray(state.items, (item) => item.id !== id),
        totalItems: state.totalItems - 1
      })
    )();
  }

  private addItemToList(user: User): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        items: [user, ...state.items],
        totalItems: state.totalItems + 1
      })
    )();
  }

  private updateItemInList(user: User): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        items: (() => {
          const index = findIndex(state.items, { id: user.id });

          return (index !== -1)
            ? [...state.items.slice(0, index), user, ...state.items.slice(index + 1)]
            : state.items;
        })()
      })
    )();
  }

  private updateSelectedCustomer(customer: Customer): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        selectedCustomer: customer
      })
    )();
  }

  private resetPagination(): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        page: 1,
        items: [],
        totalItems: 0
      })
    )();
  }

  private updateNextPage(): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        page: state.page + 1
      })
    )();
  }

  private updateStateSort(parameters: AccountAdminUsersQueryParameters): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        orderBy: parameters.orderBy,
        desc: parameters.desc,
        page: 1,
        items: [],
        totalItems: 0
      })
    )();
  }

  private updateQueryParameters(parameters: AccountAdminUsersQueryParameters): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        orderBy: parameters.orderBy || state.orderBy,
        desc: parameters.desc || state.desc,
        page: parameters.page || state.page,
        filterFormState: updateGroup<AccountAdminUsersFilterForm>(
          state.filterFormState,
          {
            simproCustomerID: setValue(parameters.simproCustomerID || state.filterFormState.value.simproCustomerID),
            name: setValue(parameters.name || state.filterFormState.value.name),
            email: setValue(parameters.email || state.filterFormState.value.email)
          }
        )
      })
    )();
  }

  private registerOpenCreateUserDialogEffect(): void {
    this.openCreateUserDialogEffect$ = this.componentStore.effect((origin$) =>
      origin$.pipe(
        map(() => this.dialogService.open(AccountDialogEditUserComponent, {
          autoFocus: false
        }))
      )
    );
  }

  private registerLoadItemsEffect(): void {
    this.loadItemsEffect$ = this.componentStore.effect((origin$: Observable<void>) =>
      origin$.pipe(
        withLatestFrom(
          this.store.select(NavigationSelectors.selectQueryParams)
        ),
        tap(([_, queryParams]) => {
          this.updateIsLoading(true);

          const parameters = new AccountAdminUsersQueryParameters({
            page: (queryParams.page) ? parseInt(queryParams.page, 10) : undefined,
            orderBy: queryParams.orderBy || undefined,
            desc: queryParams.desc === 'true',
            simproCustomerID: (queryParams.simproCustomerID) ? parseInt(queryParams.simproCustomerID, 10) : undefined,
            name: queryParams.name || undefined,
            email: queryParams.email || undefined
          });

          this.updateQueryParameters(parameters);

          return (parameters.page > 1)
            ? this.loadItemsToPage()
            : this.loadItemsByParameters();
        })
      )
    );
  }

  private registerLoadItemsByParametersEffect(): void {
    this.loadItemsByParametersEffect$ = this.componentStore.effect((origin$: Observable<number>) =>
      origin$.pipe(
        withLatestFrom(
          this.parameters$,
          this.isLoadingToPage$,
          this.relations$,
          this.filters$
        ),
        switchMap(([targetPage, parameters, isLoadingToPage, relations, filters]) => {
          const page = targetPage || parameters.page;
          const perPage = parameters.perPage;
          const orderBy = parameters.orderBy;
          const desc = parameters.desc;

          if (!isLoadingToPage) {
            this.store.dispatch(NavigationActions.mergeQueryParams({
              queryParams: {
                page,
                orderBy,
                desc,
                simproCustomerID: filters.simproCustomerID,
                name: filters.name,
                email: filters.email
              }
            }));
          }

          this.updateIsLoading(true);

          return this.tryLoadItemsByParameters({ page, perPage, orderBy, desc, relations, filters });
        })
      )
    );
  }

  private tryLoadItemsByParameters({ page, perPage, orderBy, desc, relations, filters }: {
    page: number,
    perPage: number,
    orderBy: UserSortField,
    desc: boolean,
    relations: Array<UserRelationType>,
    filters: UserFilters
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
        withLatestFrom(
          this.isLoadingToPage$,
          this.parameters$
        ),
        tapResponse(
          ([response, isLoadingToPage, parameters]) => {
            this.updateIsLoading(false);
            this.updateItems(response);

            if (!isLoadingToPage) {
              return;
            }

            if (response.currentPage >= parameters.page) {
              this.updateIsLoadingToPage(false);

              return;
            }

            if (response.currentPage !== response.lastPage) {
              this.loadItemsByParameters(response.currentPage + 1);

              return;
            }

            this.updateIsLoadingToPage(false);
            this.updateQueryParameters(new AccountAdminUsersQueryParameters({ page: response.currentPage }));
            this.store.dispatch(NavigationActions.mergeQueryParams({
              queryParams: { page: response.currentPage }
            }));
          },
          () => this.updateIsLoading(false)
        )
      );
  }

  private registerLoadNextPageEffect(): void {
    this.loadNextPageEffect$ = this.componentStore.effect((origin$: Observable<void>) =>
      origin$.pipe(
        tap(() => {
          this.updateNextPage();

          this.loadItemsByParameters();
        })
      )
    );
  }

  private registerLoadItemsToPageEffect(): void {
    this.loadItemsToPageEffect$ = this.componentStore.effect((origin$: Observable<void>) =>
      origin$.pipe(
        tap(() => {
          this.updateIsLoadingToPage(true);

          this.loadItemsByParameters(1);
        })
      )
    );
  }

  private registerAddCreatedItemEffect(): void {
    this.componentStore.effect(() =>
      this.actions$.pipe(
        ofType(AccountDialogEditUserActions.createUserSuccess),
        withLatestFrom(
          this.relations$
        ),
        mergeMap(([{ userID }, relations]) => this.userService
          .get(userID, relations)
          .pipe(
            tap((user) => this.addItemToList(user))
          )
        )
      )
    );
  }

  private registerChangeUpdatedItemEffect(): void {
    this.componentStore.effect(() =>
      this.actions$.pipe(
        ofType(AccountDialogEditUserActions.updateUserSuccess),
        withLatestFrom(
          this.relations$
        ),
        mergeMap(([{ userID }, relations]) => this.userService
          .get(userID, relations)
          .pipe(
            withLatestFrom(
              this.userService.profile$
            ),
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
