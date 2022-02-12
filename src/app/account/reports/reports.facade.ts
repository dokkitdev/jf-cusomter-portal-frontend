import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@shared/store';

@Injectable()
export class AccountReportsPageFacade {
  constructor(
    private store: Store<AppState>
  ) { }
}
