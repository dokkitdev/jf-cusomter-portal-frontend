import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { EMPTY, Observable, of } from 'rxjs';
import { switchMap, tap, catchError } from 'rxjs/operators';
import { tapResponse } from '@ngrx/operators';
import { NotifyService, ParsingLog, SystemLog } from '@shared/notify';
import { NotifySystemLogsSortField } from '@shared/notify/type/system-logs-sort-field';
import { NotifyParsingLogsSortField } from '@shared/notify/type/parsing-logs-sort-field';
import { NotificationService } from '@shared/notification';
import { FileService } from '@shared/file';
import { DialogService } from '@shared/dialog';
import { AdminLogsTab } from './shared/types';
import { AccountAdminLogsQueryParameters } from './shared/query-parameters';
import { AdminLogsParsingLogsDialogComponent } from './shared/components/parsing-logs-dialog/parsing-logs-dialog.component';
import { AccountAdminDocumentsPageState } from './logs.state';

@Injectable()
export class AccountAdminLogsPageFacade extends ComponentStore<AccountAdminDocumentsPageState> {
  public readonly systemLogs$ = this.select((state) => state.systemLogs);
  public readonly parsingLogs$ = this.select((state) => state.parsingLogs);
  public readonly isLoadingSystem$ = this.select((state) => state.isLoadingSystem);
  public readonly isLoadingParsing$ = this.select((state) => state.isLoadingParsing);
  public readonly currentSystemPage$ = this.select((state) => state.currentSystemPage);
  public readonly currentParsingPage$ = this.select((state) => state.currentParsingPage);
  public readonly systemTotalPages$ = this.select((state) => state.systemTotalPages);
  public readonly parsingTotalPages$ = this.select((state) => state.parsingTotalPages);
  public readonly activeTab$ = this.select((state) => state.activeTab);
  public readonly orderBy$ = this.select((state) => state.orderBy);
  public readonly desc$ = this.select((state) => state.desc);
  public readonly systemPerPage$ = this.select((state) => state.systemPerPage);
  public readonly parsingPerPage$ = this.select((state) => state.parsingPerPage);
  public readonly systemPaginationId$ = this.select((state) => state.systemPaginationId);
  public readonly parsingPaginationId$ = this.select((state) => state.parsingPaginationId);

  public readonly parameters$ = this.select(
    this.currentSystemPage$,
    this.orderBy$,
    this.desc$,
    (page, orderBy, desc) => new AccountAdminLogsQueryParameters({ page, orderBy, desc })
  );

  public readonly setActiveTab = this.updater((state, activeTab: AdminLogsTab) => ({
    ...state,
    activeTab
  }));

  public readonly setSystemPage = this.updater((state, page: number) => ({
    ...state,
    currentSystemPage: page
  }));

  public readonly setParsingPage = this.updater((state, page: number) => ({
    ...state,
    currentParsingPage: page
  }));

  public readonly updateSort = this.updater((state, parameters: AccountAdminLogsQueryParameters) => ({
    ...state,
    orderBy: parameters.orderBy,
    desc: parameters.desc
  }));

  public readonly loadSystemLogs = this.effect((page$: Observable<number>) =>
    page$.pipe(
      tap(() => this.patchState({ isLoadingSystem: true })),
      switchMap((page) => {
        const state = this.get();
        return this.notifyService
          .searchSystemLogs({
            page,
            orderBy: state.orderBy as NotifySystemLogsSortField,
            desc: state.desc
          })
          .pipe(
            tapResponse(
              (response) => {
                this.patchState({
                  systemLogs: response.items,
                  systemTotalPages: response.lastPage,
                  isLoadingSystem: false
                });
              },
              (error: unknown) => {
                this.patchState({ isLoadingSystem: false });
              }
            )
          );
      })
    )
  );

  public readonly loadParsingLogs = this.effect((page$: Observable<number>) =>
    page$.pipe(
      tap(() => this.patchState({ isLoadingParsing: true })),
      switchMap((page) => {
        const state = this.get();
        return this.notifyService
          .searchParsingLogs({
            page,
            orderBy: state.orderBy as NotifyParsingLogsSortField,
            desc: state.desc
          })
          .pipe(
            tapResponse(
              (response) => {
                this.patchState({
                  parsingLogs: response.items,
                  parsingTotalPages: response.lastPage,
                  isLoadingParsing: false
                });
              },
              (error: unknown) => {
                this.patchState({ isLoadingParsing: false });
              }
            )
          );
      })
    )
  );

  public readonly downloadReportLetters = this.effect((reportId$: Observable<number>) =>
    reportId$.pipe(
      switchMap((reportId) =>
        this.notifyService.downloadReportLetters(reportId).pipe(
          tapResponse(
            (blob) => {
              this.fileService.saveFile(blob, `report-${reportId}-letters.pdf`);
            },
            (error: unknown) => of(null)
          ),
          catchError((error: unknown) => of(null))
        )
      )
    )
  );

  constructor(
    private notifyService: NotifyService,
    private notificationService: NotificationService,
    private fileService: FileService,
    private dialogService: DialogService
  ) {
    super(new AccountAdminDocumentsPageState());
  }

  public loadSystem(): void {
    const currentPage = this.get().currentSystemPage;
    this.loadSystemLogs(of(currentPage));
  }

  public loadParsing(): void {
    const currentPage = this.get().currentParsingPage;
    this.loadParsingLogs(of(currentPage));
  }

  public changeSystemPage(page: number): void {
    this.setSystemPage(page);
    this.loadSystemLogs(of(page));
  }

  public changeParsingPage(page: number): void {
    this.setParsingPage(page);
    this.loadParsingLogs(of(page));
  }

  public changeTab(tab: AdminLogsTab): void {
    this.setActiveTab(tab);
    if (tab === 'system' && this.get().systemLogs.length === 0) {
      this.loadSystem();
    } else if (tab === 'parsing' && this.get().parsingLogs.length === 0) {
      this.loadParsing();
    }
  }

  public changeSort(parameters: AccountAdminLogsQueryParameters): void {
    this.updateSort(parameters);

    if (this.get().activeTab === 'system') {
      this.loadSystem();
    } else {
      this.loadParsing();
    }
  }

  public downloadLetters(reportId: number): void {
    this.downloadReportLetters(of(reportId));
  }

  public openParsingLogsDialog(parsingLog: ParsingLog): void {
    this.dialogService.open(AdminLogsParsingLogsDialogComponent, {
      autoFocus: false,
      disableClose: false,
      data: { parsingLog }
    });
  }

  public resetState(): void {
    this.setState(new AccountAdminDocumentsPageState());
  }
}
