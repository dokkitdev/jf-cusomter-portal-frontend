import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable } from 'rxjs';
import { AccountJobsItemComponentState } from './item.state';

@Injectable()
export class AccountJobsItemComponentFacade {
  public get isDescriptionOpened$(): Observable<boolean> {
    return this.componentStore.select((store) => store.isDescriptionOpened);
  }

  constructor(
    private readonly componentStore: ComponentStore<AccountJobsItemComponentState>
  ) {
    this.resetState();
  }

  public resetState(): void {
    this.componentStore.setState(new AccountJobsItemComponentState());
  }

  public toggleIsDescriptionOpened(): void {
    this.toggleStateIsDescriptionOpened();
  }

  private toggleStateIsDescriptionOpened(): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        isDescriptionOpened: !state.isDescriptionOpened
      })
    )();
  }
}
