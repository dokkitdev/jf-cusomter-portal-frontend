import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable, of } from 'rxjs';
import { AccountReportsGeneralPageState } from './general.state';

@Injectable()
export class AccountReportsGeneralPageFacade extends ComponentStore<AccountReportsGeneralPageState> {
  public readonly items$ = this.select((state) => state.items);
  public readonly isLoading$ = this.select((state) => state.isLoading);
  public readonly sortParameters$ = this.select((state) => state.sortParameters);

  constructor() {
    super(new AccountReportsGeneralPageState());
  }

  // TODO: Implement actual data loading logic
  public loadItems(): void {
    // Placeholder for future implementation
  }
}
