import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountReportsZeroPageFacade } from './zero.facade';

@Component({
  selector: 'account-reports-zero-page',
  templateUrl: 'zero.html',
  styleUrls: ['zero.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class AccountReportsZeroPageComponent {
  public isReportGenerated$: Observable<boolean>;

  constructor(private facade: AccountReportsZeroPageFacade) {
    this.isReportGenerated$ = this.facade.isReportGenerated$;
  }
}
