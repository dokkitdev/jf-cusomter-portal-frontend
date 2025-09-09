import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { tapResponse } from '@ngrx/operators';
import { NotifyService } from '@shared/notify';
import { FileService } from '@shared/file';
import { PaginationResponse } from '@shared/pagination';
import { CsvReport } from './shared/models/csv-report';
import { AccountReportsGeneralPageState } from './general.state';
import { GeneralReportsSortField } from './shared/types/general-reports-sort-field';
import { AccountReportsGeneralQueryParameters } from './shared/types/query-parameters';

@Injectable()
export class AccountReportsGeneralPageFacade extends ComponentStore<AccountReportsGeneralPageState> {
  public readonly items$ = this.select((state) => state.items);
  public readonly isLoading$ = this.select((state) => state.isLoading);
  public readonly perPage$ = this.select((state) => state.perPage);
  public readonly currentPage$ = this.select((state) => state.page);
  public readonly totalPages$ = this.select((state) => state.totalPages);
  public readonly hasPagination$ = this.select((state) => state.totalItems > 0);
  public readonly paginationID$ = this.select((state) => state.paginationID);
  public readonly totalItems$ = this.select((state) => state.totalItems);
  public readonly orderBy$ = this.select((state) => state.orderBy);
  public readonly desc$ = this.select((state) => state.desc);

  public readonly parameters$ = this.select(
    this.currentPage$,
    this.orderBy$,
    this.desc$,
    (page, orderBy, desc) => new AccountReportsGeneralQueryParameters({ page, orderBy, desc })
  );

  public readonly setPage = this.updater((state, page: number) => ({
    ...state,
    page
  }));

  public readonly updateSort = this.updater((state, parameters: AccountReportsGeneralQueryParameters) => ({
    ...state,
    orderBy: parameters.orderBy,
    desc: parameters.desc,
    page: 1
  }));

  public readonly setIsLoading = this.updater((state, isLoading: boolean) => ({
    ...state,
    isLoading
  }));

  private readonly loadItemsEffect$ = this.effect((origin$: Observable<void>) =>
    origin$.pipe(
      switchMap(() => {
        const state = this.get();

        return this.notifyService
          .searchCsvReports({
            page: state.page,
            perPage: state.perPage,
            orderBy: state.orderBy,
            desc: state.desc
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

  public resetState(): void {
    this.setState(new AccountReportsGeneralPageState());
  }

  public loadItems(): void {
    this.setIsLoading(true);
    this.loadItemsEffect$();
  }

  public loadItemsByPage(page: number): void {
    this.setPage(page);
    this.patchState({
      isLoading: true,
      items: []
    });
    this.loadItems();
  }

  public changeSort(parameters: AccountReportsGeneralQueryParameters): void {
    this.updateSort(parameters);
    this.patchState({
      isLoading: true,
      items: []
    });
    this.loadItems();
  }

  public onDownloadClicked(item: CsvReport): void {
    this.downloadCsvReportEffect$(of(item.id));
  }

  private onLoadItemsSuccess(response: PaginationResponse<CsvReport>): void {
    console.log('response', response);
    this.patchState({
      items: response.items,
      totalPages: response.lastPage,
      totalItems: response.totalItems,
      isLoading: false
    });
  }

  private onLoadItemsError(error: Error): void {
    this.setIsLoading(false);
  }
}
