import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AccountAdminLogsPageFacade } from '../../../logs.facade';
import { Observable } from 'rxjs';
import { AdminLogsTab } from '../../types';

@Component({
  selector: 'admin-logs-parsing-logs',
  templateUrl: 'parsing-logs.html',
  styleUrls: ['parsing-logs.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class AccountAdminLogsParsingLogsComponent {
  public activeTab$: Observable<AdminLogsTab>;

  constructor(private facade: AccountAdminLogsPageFacade) {
    this.activeTab$ = this.facade.activeTab$;
  }
}
