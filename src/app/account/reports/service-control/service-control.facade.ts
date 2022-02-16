import { Observable } from 'rxjs';
import { Asset } from '@shared/asset';
import { AccountReportsServiceControlState } from './service-control.state';
import { ComponentStore } from '@ngrx/component-store';
import { Injectable } from '@angular/core';

@Injectable()
export class AccountReportsServiceControlFacade {
  public get isLoading$(): Observable<boolean> {
    return this.componentStore.select((state) => state.isLoading);
  }

  public get items$(): Observable<Array<Asset>> {
    return this.componentStore.select((state) => state.items);
  };

  public get paginationId$(): Observable<string> {
    return this.componentStore.select((state) => state.paginationId);
  };

  constructor(
    private componentStore: ComponentStore<AccountReportsServiceControlState>
  ) {
    this.resetState();
  }

  public resetState(): void {
    this.componentStore.setState(new AccountReportsServiceControlState());
  }
}
