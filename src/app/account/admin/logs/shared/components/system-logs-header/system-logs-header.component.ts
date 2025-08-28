import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountAdminLogsPageFacade } from '../../../logs.facade';
import { AccountAdminLogsQueryParameters } from '../../query-parameters';
import { NotifySystemLogsSortField } from '@shared/notify/type/system-logs-sort-field';

@Component({
  selector: 'admin-logs-system-logs-header',
  templateUrl: 'system-logs-header.html',
  styleUrls: ['system-logs-header.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class AccountAdminLogsSystemLogsHeaderComponent {
  public parameters$: Observable<AccountAdminLogsQueryParameters>;
  public logsSortField: typeof NotifySystemLogsSortField;

  constructor(private facade: AccountAdminLogsPageFacade) {
    this.parameters$ = this.facade.parameters$;
    this.logsSortField = NotifySystemLogsSortField;
  }

  public sortChanged(parameters: AccountAdminLogsQueryParameters): void {
    this.facade.changeSort(parameters);
  }
}
