import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { AccountReportsKPIPageFacade } from './kpi.facade';

@Component({
  selector: 'account-reports-kpi-page',
  templateUrl: 'kpi.html',
  styleUrls: ['kpi.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountReportsKPIComponent implements OnInit, OnDestroy {
  constructor(
    private facade: AccountReportsKPIPageFacade
  ) { }

  public ngOnInit(): void {
    this.facade.loadItems();
  }

  public ngOnDestroy(): void {
    this.facade.resetState();
  }
}
