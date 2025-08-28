import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountAdminLogsPageFacade } from '../../../logs.facade';
import { AccountAdminLogsQueryParameters } from '../../query-parameters';
import { NotifyParsingLogsSortField } from '@shared/notify/type/parsing-logs-sort-field';

@Component({
  selector: 'admin-logs-parsing-logs-header',
  templateUrl: 'parsing-logs-header.html',
  styleUrls: ['parsing-logs-header.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class AccountAdminLogsParsingLogsHeaderComponent {
  public parameters$: Observable<AccountAdminLogsQueryParameters>;
  public logsSortField: typeof NotifyParsingLogsSortField;

  constructor(private facade: AccountAdminLogsPageFacade) {
    this.parameters$ = this.facade.parameters$;
    this.logsSortField = NotifyParsingLogsSortField;
  }

  public sortChanged(parameters: AccountAdminLogsQueryParameters): void {
    this.facade.changeSort(parameters);
  }
}
