import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { tapResponse } from '@ngrx/operators';
import { NotifyService } from '@shared/notify';
import { PaginationResponse } from '@shared/pagination';
import { CsvReport } from './shared/models/csv-report';
import { AccountReportsGeneralPageState } from './general.state';

@Injectable()
export class AccountReportsGeneralPageFacade extends ComponentStore<AccountReportsGeneralPageState> {
  public readonly items$ = this.select((state) => state.items);
  public readonly isLoading$ = this.select((state) => state.isLoading);
  public readonly sortParameters$ = this.select((state) => state.sortParameters);
  public readonly hasPagination$ = this.select((state) => state.totalItems > 0);
  public readonly perPage$ = this.select((state) => state.perPage);
  public readonly currentPage$ = this.select((state) => state.page);
  public readonly totalItems$ = this.select((state) => state.totalItems);
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

  constructor(private notifyService: NotifyService) {
    super(new AccountReportsGeneralPageState());
  }

  public loadItems(): void {
    this.loadItemsEffect$();
  }

  public onSortChanged(event: any): void {
    // TODO: Implement sorting logic
  }

  public onDownloadClicked(item: CsvReport): void {
    // TODO: Implement download logic
  }

  private onLoadItemsSuccess(response: PaginationResponse<CsvReport>): void {
    this.patchState({
      items: response.items,
      totalItems: response.totalItems,
      isLoading: false
    });
  }

  private onLoadItemsError(error: Error): void {
    this.patchState({ isLoading: false });
    // TODO: Handle error
  }
}
