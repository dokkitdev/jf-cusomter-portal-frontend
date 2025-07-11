import { Component, ChangeDetectionStrategy, OnDestroy, OnInit } from '@angular/core';
import { AccountReportsPageFacade } from './reports.facade';

@Component({
  selector: 'account-reports-page',
  templateUrl: 'reports.html',
  styleUrls: ['reports.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountReportsPageComponent implements OnInit, OnDestroy {
  constructor(
    private facade: AccountReportsPageFacade
  ) { }

  public ngOnInit(): void {
    this.facade.loadItems();
  }

  public ngOnDestroy(): void {
    this.facade.resetState();
  }
}
