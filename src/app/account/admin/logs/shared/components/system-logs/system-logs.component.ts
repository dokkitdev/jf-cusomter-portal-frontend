import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AccountAdminLogsPageFacade } from '../../../logs.facade';
import { Observable } from 'rxjs';
import { AdminLogsTab } from '../../types';

@Component({
  selector: 'admin-logs-system-logs',
  templateUrl: 'system-logs.html',
  styleUrls: ['system-logs.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class AccountAdminLogsSystemLogsComponent {
  public activeTab$: Observable<AdminLogsTab>;

  constructor(private facade: AccountAdminLogsPageFacade) {
    this.activeTab$ = this.facade.activeTab$;
  }
}
