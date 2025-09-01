import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { tapResponse } from '@ngrx/operators';
import { catchError } from 'rxjs/operators';
import { NotifyService } from '@shared/notify';
import { FileService } from '@shared/file';
import { PaginationResponse } from '@shared/pagination';
import { CsvReport } from './shared/models/csv-report';
import { AccountReportsGeneralPageState } from './general.state';

@Injectable()
export class AccountReportsGeneralPageFacade extends ComponentStore<AccountReportsGeneralPageState> {
  public readonly items$ = this.select((state) => state.items);
  public readonly isLoading$ = this.select((state) => state.isLoading);
  public readonly sortParameters$ = this.select((state) => state.sortParameters);
  public readonly perPage$ = this.select((state) => state.perPage);
  public readonly currentPage$ = this.select((state) => state.page);
  public readonly totalPages$ = this.select((state) => state.totalPages);
  public readonly paginationId$ = this.select((state) => state.paginationId);

  private readonly loadItemsEffect$ = this.effect((origin$: Observable<void>) =>
    origin$.pipe(
      tap(() => this.patchState({ isLoading: true })),
      switchMap(() => {
        const state = this.get();
        return this.notifyService
          .searchCsvReports({
            page: state.page,
            perPage: state.perPage
          })
          .pipe(
            tapResponse(
              (response) => this.onLoadItemsSuccess(response),
              (error: Error) => this.onLoadItemsError(error)
            )
          );
      })
    )
  );

  private readonly downloadCsvReportEffect$ = this.effect((reportId$: Observable<number>) =>
    reportId$.pipe(
      switchMap((reportId) =>
        this.notifyService.downloadCsvReport(reportId).pipe(
          tapResponse(
            (blob) => {
              this.fileService.saveFile(blob, `csv-report-${reportId}.csv`);
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
    private fileService: FileService
  ) {
    super(new AccountReportsGeneralPageState());
  }

  public loadItems(): void {
    this.loadItemsEffect$();
  }

  public onSortChanged(event: any): void {
    // TODO: Implement sorting logic
  }

  public onDownloadClicked(item: CsvReport): void {
    this.downloadCsvReportEffect$(of(item.id));
  }

  private onLoadItemsSuccess(response: PaginationResponse<CsvReport>): void {
    console.log('response', response);
    this.patchState({
      items: response.items,
      totalPages: response.lastPage,
      isLoading: false
    });
  }

  private onLoadItemsError(error: Error): void {
    this.patchState({ isLoading: false });
    // TODO: Handle error
  }
}
