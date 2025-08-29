import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { AccountReportsGeneralPageState } from './general.state';

@Injectable()
export class AccountReportsGeneralPageFacade {
  constructor(private readonly componentStore: ComponentStore<AccountReportsGeneralPageState>) {}
}
