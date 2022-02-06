import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '@shared/store';

@Injectable()
export class AccountDocumentsPageFacade {
  

  constructor(
    private store: Store<AppState>
  ) { }
}
