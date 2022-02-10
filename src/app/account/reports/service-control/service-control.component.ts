import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AccountReportsServiceControlPageFacade } from './service-control.facade';
import { Observable } from 'rxjs';

@Component({
  selector: 'account-reports-service-control-page',
  templateUrl: 'service-control.html',
  styleUrls: ['service-control.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountReportsServiceControlPageComponent {
  public isLoading$: Observable<boolean>;

  constructor(
    private facade: AccountReportsServiceControlPageFacade
  ) {
    this.isLoading$ = this.facade.isLoading$;
  }
}
