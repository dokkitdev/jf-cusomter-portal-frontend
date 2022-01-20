import { AccountAdminUsersFilterForm } from './shared/forms';
import { AccountDialogEditUserComponent } from './../../shared/dialog-edit-user';
import { map, Observable } from 'rxjs';
import { DialogService } from '@shared/dialog';
import { ComponentStore } from '@ngrx/component-store';
import { AccountAdminUsersPageState } from './users.state';
import { Injectable } from '@angular/core';
import { FormGroupState, FormControlState } from 'ngrx-forms';
import { FilterValue } from '@shared/filter-values';

@Injectable()
export class AccountAdminUsersPageFacade {
  public get filterFormState$(): Observable<FormGroupState<AccountAdminUsersFilterForm>> {
    return this.componentStore.select((state) => state.filterFormState);
  }

  public get filterFormStateValue$(): Observable<AccountAdminUsersFilterForm> {
    return this.componentStore.select((state) => state.filterFormState.value);
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

  private openCreateUserDialogEffect$: () => Observable<void>;

  constructor(
    private readonly componentStore: ComponentStore<AccountAdminUsersPageState>,
    private readonly dialogService: DialogService
  ) {
    this.resetState();

    this.registerOpenCreateUserDialogEffect();
  }

  public resetState(): void {
    this.componentStore.setState(new AccountAdminUsersPageState());
  }

  public createItem(): void {
    this.openCreateUserDialogEffect$();
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
