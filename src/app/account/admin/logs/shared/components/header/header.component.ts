import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountAdminLogsPageFacade } from '../../../logs.facade';
import { AdminLogsTab } from '../../types';

@Component({
  selector: 'admin-logs-header',
  templateUrl: 'header.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class AccountAdminLogsHeaderComponent {
  public activeTab$: Observable<AdminLogsTab>;

  constructor(private facade: AccountAdminLogsPageFacade) {
    this.activeTab$ = this.facade.activeTab$;
  }

  public changeTab(tab: 'system' | 'parsing'): void {
    this.facade.changeTab(tab);
  }
}
