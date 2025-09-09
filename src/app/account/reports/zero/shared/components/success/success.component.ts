import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AccountReportsZeroPageFacade } from '@app/account/reports/zero/zero.facade';

@Component({
  selector: 'account-reports-zero-success',
  templateUrl: 'success.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class AccountReportsZeroSuccessComponent {
  constructor(private facade: AccountReportsZeroPageFacade) {}

  public generateNewReport(): void {
    this.facade.generateNewReport();
  }

  public goToReports(): void {
    this.facade.goToReports();
  }
}
