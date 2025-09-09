import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountReportsWarehousePageFacade } from './warehouse.facade';

@Component({
  selector: 'account-reports-warehouse-page',
  templateUrl: 'warehouse.html',
  styleUrls: ['warehouse.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class AccountReportsWarehousePageComponent {
  public isReportGenerated$: Observable<boolean>;

  constructor(private facade: AccountReportsWarehousePageFacade) {
    this.isReportGenerated$ = this.facade.isReportGenerated$;
  }

  public generateNewReport(): void {
    this.facade.generateNewReport();
  }

  public goToReports(): void {
    this.facade.goToReports();
  }
}
