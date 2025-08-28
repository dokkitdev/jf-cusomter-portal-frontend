import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountAdminLogsPageFacade } from './logs.facade';
import { ParsingLog, SystemLog } from '@shared/notify';
import { AdminLogsTab } from './shared/types';

@Component({
  selector: 'app-account-admin-logs-page',
  templateUrl: './logs.html',
  styleUrls: ['./logs.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class AccountAdminLogsPageComponent implements OnInit {
  public systemLogs$: Observable<Array<SystemLog>>;
  public parsingLogs$: Observable<Array<ParsingLog>>;
  public isLoadingSystem$: Observable<boolean>;
  public isLoadingParsing$: Observable<boolean>;
  public currentSystemPage$: Observable<number>;
  public currentParsingPage$: Observable<number>;
  public systemTotalPages$: Observable<number>;
  public parsingTotalPages$: Observable<number>;
  public activeTab$: Observable<AdminLogsTab>;

  // Column definitions for the tables
  public readonly systemDisplayedColumns = [
    'id',
    'reportType',
    'lettersGenerated',
    'isFinished',
    'createdAt',
    'actions'
  ];
  public readonly parsingDisplayedColumns = [
    'id',
    'parsingType',
    'parsingDate',
    'totalCount',
    'successCount',
    'actions'
  ];

  constructor(private facade: AccountAdminLogsPageFacade) {
    this.systemLogs$ = this.facade.systemLogs$;
    this.parsingLogs$ = this.facade.parsingLogs$;
    this.isLoadingSystem$ = this.facade.isLoadingSystem$;
    this.isLoadingParsing$ = this.facade.isLoadingParsing$;
    this.currentSystemPage$ = this.facade.currentSystemPage$;
    this.currentParsingPage$ = this.facade.currentParsingPage$;
    this.systemTotalPages$ = this.facade.systemTotalPages$;
    this.parsingTotalPages$ = this.facade.parsingTotalPages$;
    this.activeTab$ = this.facade.activeTab$;
  }

  public ngOnInit(): void {
    this.facade.loadSystem();
  }

  public changeSystemPage(page: number): void {
    this.facade.changeSystemPage(page);
  }

  public changeParsingPage(page: number): void {
    this.facade.changeParsingPage(page);
  }

  public changeTab(tab: AdminLogsTab): void {
    this.facade.changeTab(tab);
  }

  public openLogsDetailsDialog(log: SystemLog | ParsingLog): void {
    // TODO: Implement logs details dialog
    console.log('Opening logs details for:', log);
  }
}
