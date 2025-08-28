import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AccountAdminLogsPageFacade } from '../../../logs.facade';
import { Observable } from 'rxjs';
import { ParsingLog } from '@shared/notify';
import { heightCollapseAnimation } from '@shared/animations';
import { map } from 'rxjs/operators';

@Component({
  selector: 'admin-logs-parsing-logs',
  templateUrl: 'parsing-logs.html',
  styleUrls: ['parsing-logs.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [heightCollapseAnimation],
  standalone: false
})
export class AccountAdminLogsParsingLogsComponent {
  public items$: Observable<Array<ParsingLog>>;
  public isLoading$: Observable<boolean>;
  public currentPage$: Observable<number>;
  public totalPages$: Observable<number>;
  public hasPagination$: Observable<boolean>;

  constructor(private facade: AccountAdminLogsPageFacade) {
    this.items$ = this.facade.parsingLogs$;
    this.isLoading$ = this.facade.isLoadingParsing$;
    this.currentPage$ = this.facade.currentParsingPage$;
    this.totalPages$ = this.facade.parsingTotalPages$;
    this.hasPagination$ = this.facade.parsingTotalPages$.pipe(map((totalPages) => totalPages > 1));
  }

  public pageChanged(page: number): void {
    this.facade.changeParsingPage(page);
  }

  public onShowClicked(parsingLog: ParsingLog): void {
    this.facade.openParsingLogsDialog(parsingLog);
  }
}
