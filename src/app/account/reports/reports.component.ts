import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AccountReportsPageFacade } from './reports.facade';
import { Observable } from 'rxjs';

@Component({
  selector: 'account-reports-page',
  templateUrl: 'reports.html',
  styleUrls: ['reports.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountReportsPageComponent {
  public isLoading$: Observable<boolean>;

  constructor(
    private facade: AccountReportsPageFacade
  ) {
    this.isLoading$ = this.facade.isLoading$;
  }
}
