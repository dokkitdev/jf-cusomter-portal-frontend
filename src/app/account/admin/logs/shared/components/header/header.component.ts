import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AccountAdminLogsPageFacade } from '../../../logs.facade';
import { Observable } from 'rxjs';
import { AdminLogsTab } from '../../types';

@Component({
  selector: 'admin-logs-header',
  templateUrl: 'header.html',
  styleUrls: ['header.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class AccountAdminLogsHeaderComponent {
  public activeTab$: Observable<AdminLogsTab>;

  constructor(private facade: AccountAdminLogsPageFacade) {
    this.activeTab$ = this.facade.activeTab$;
  }

  public tabChanged(tab: AdminLogsTab): void {
    this.facade.changeTab(tab);
  }
}
