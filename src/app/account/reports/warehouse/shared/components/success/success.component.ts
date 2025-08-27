import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AccountReportsWarehousePageFacade } from '@app/account/reports/warehouse/warehouse.facade';

@Component({
  selector: 'account-reports-warehouse-success',
  templateUrl: 'success.html',
  styleUrls: ['success.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class AccountReportsWarehouseSuccessComponent {
  constructor(private facade: AccountReportsWarehousePageFacade) {}

  public generateNewReport(): void {
    this.facade.generateNewReport();
  }

  public goToReports(): void {
    this.facade.goToReports();
  }
}
