import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AccountAdminLogsPageFacade } from '../../../logs.facade';
import { Observable, of } from 'rxjs';
import { SystemLog } from '@shared/notify';
import { heightCollapseAnimation } from '@shared/animations';
import { map } from 'rxjs/operators';

@Component({
  selector: 'admin-logs-system-logs',
  templateUrl: 'system-logs.html',
  styleUrls: ['system-logs.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [heightCollapseAnimation],
  standalone: false
})
export class AccountAdminLogsSystemLogsComponent {
  public items$: Observable<Array<SystemLog>>;
  public isLoading$: Observable<boolean>;
  public currentPage$: Observable<number>;
  public totalPages$: Observable<number>;
  public hasPagination$: Observable<boolean>;
  public perPage$: Observable<number>;
  public totalItems$: Observable<number>;
  public paginationId$: Observable<string>;

  constructor(private facade: AccountAdminLogsPageFacade) {
    this.items$ = this.facade.systemLogs$;
    this.isLoading$ = this.facade.isLoadingSystem$;
    this.currentPage$ = this.facade.currentSystemPage$;
    this.totalPages$ = this.facade.systemTotalPages$;
    this.hasPagination$ = this.facade.systemTotalPages$.pipe(map((totalPages) => totalPages > 1));
    this.perPage$ = this.facade.systemPerPage$;
    this.totalItems$ = this.facade.systemLogs$.pipe(map((logs) => logs.length));
    this.paginationId$ = this.facade.systemPaginationId$;
  }

  public pageChanged(page: number): void {
    this.facade.changeSystemPage(page);
  }

  public onOpenLettersClicked(systemLog: SystemLog): void {
    this.facade.downloadLetters(systemLog.id);
  }
}
