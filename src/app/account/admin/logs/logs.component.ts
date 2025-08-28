import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { AccountAdminLogsPageFacade } from './logs.facade';

@Component({
  selector: 'account-admin-logs-page',
  templateUrl: 'logs.html',
  styleUrls: ['logs.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class AccountAdminLogsPageComponent implements OnInit, OnDestroy {
  constructor(public facade: AccountAdminLogsPageFacade) {}

  public ngOnInit(): void {
    this.facade.loadSystem();
  }

  public ngOnDestroy(): void {
    this.facade.resetState();
  }
}
