import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@shared/store';

@Injectable()
export class AccountAdminDocumentsPageFacade {
  constructor(
    private store: Store<AppState>
  ) { }
}
