import { PaginationResponse } from '@shared/pagination';
import { NavigationActions } from './../../../shared/navigation/store/actions';
import { AppState } from '@shared/store';
import { withLatestFrom, switchMap } from 'rxjs/operators';
import { UserFilters, UserRelationType, UserSortField, UserService, User } from '@shared/user';
import { AccountAdminUsersFilterForm } from './shared/forms';
import { AccountDialogEditUserComponent } from './../../shared/dialog-edit-user';
import { map, Observable } from 'rxjs';
import { DialogService } from '@shared/dialog';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { AccountAdminUsersPageState } from './users.state';
import { Injectable } from '@angular/core';
import { FormGroupState, FormControlState, formGroupReducer, SetValueAction, Actions as FormActions, updateGroup, setValue } from 'ngrx-forms';
import { FilterValue } from '@shared/filter-values';
import { AccountAdminUsersQueryParameters } from './shared/models';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';

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

  private loadItemsByParametersEffect$: (page?: number) => Observable<void>;
  private openCreateUserDialogEffect$: () => Observable<void>;

  constructor(
    private readonly componentStore: ComponentStore<AccountAdminUsersPageState>,
    private readonly store: Store<AppState>,
    private readonly actions$: Actions,
    private readonly userService: UserService,
    private readonly dialogService: DialogService
  ) {
    this.resetState();

    this.registerLoadItemsByParametersEffect();
    this.registerOpenCreateUserDialogEffect();
  }

  public resetState(): void {
    this.componentStore.setState(new AccountAdminUsersPageState());
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

  public loadItemsByParameters(page?: number): void {
    this.loadItemsByParametersEffect$(page);
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

  private updateFormState(action: FormActions<any>): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        filterFormState: formGroupReducer(state.filterFormState, action)
      })
    )();
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

  private updateItems(response: PaginationResponse<User>): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        items: [...state.items, ...response.items],
        totalItems: response.totalItems
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

  private createFilterValue(control: FormControlState<string | number | undefined>): FilterValue {
    return new FilterValue({ id: control.id, value: control.value });
  }
}
