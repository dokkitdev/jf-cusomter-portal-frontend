import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from '@shared/notification';
import { AppState } from '@shared/store';
import { Actions, disable, enable, formGroupReducer, FormGroupState } from 'ngrx-forms';
import { exhaustMap, filter, Observable, tap, withLatestFrom, map } from 'rxjs';
import { AccountReportsAssetPageState, AssetReportItem, AssetReportFilters } from './asset.state';
import { createAssetFormState } from './shared/forms/asset-form';
import { tapResponse } from '@ngrx/operators';

@Injectable()
export class AccountReportsAssetPageFacade {
  public get items$(): Observable<AssetReportItem[]> {
    return this.componentStore.select((state) => state.items);
  }

  public get isLoading$(): Observable<boolean> {
    return this.componentStore.select((state) => state.isLoading);
  }

  public get currentPage$(): Observable<number> {
    return this.componentStore.select((state) => state.currentPage);
  }

  public get totalPages$(): Observable<number> {
    return this.componentStore.select((state) => state.totalPages);
  }

  public get totalItems$(): Observable<number> {
    return this.componentStore.select((state) => state.totalItems);
  }

  public get perPage$(): Observable<number> {
    return this.componentStore.select((state) => state.perPage);
  }

  public get hasPagination$(): Observable<boolean> {
    return this.componentStore.select((state) => state.totalPages > 1);
  }

  public get paginationID$(): Observable<string> {
    return this.componentStore.select(() => 'asset-report-pagination');
  }

  public get orderBy$(): Observable<string> {
    return this.componentStore.select((state) => state.orderBy);
  }

  public get desc$(): Observable<boolean> {
    return this.componentStore.select((state) => state.desc);
  }

  public get formState$(): Observable<FormGroupState<AssetReportFilters>> {
    return this.componentStore.select((state) => state.formState);
  }

  public get parameters$(): Observable<any> {
    return this.componentStore.select((state) => ({
      currentPage: state.currentPage,
      orderBy: state.orderBy,
      desc: state.desc
    }));
  }

  private generateReportEffect$: () => Observable<void>;

  constructor(
    private readonly componentStore: ComponentStore<AccountReportsAssetPageState>,
    private readonly store: Store<AppState>,
    private readonly notificationService: NotificationService,
    private readonly translateService: TranslateService
  ) {
    this.resetState();
    this.registerGenerateReportEffect();
  }

  public resetState(): void {
    const initialState = new AccountReportsAssetPageState();
    initialState.formState = createAssetFormState();
    this.componentStore.setState(initialState);
  }

  public generateReport(): void {
    this.generateReportEffect$();
  }

  public handleFormStateAction(action: Actions<any>): void {
    this.updateFormState(action);
  }

  public changePage(page: number): void {
    this.componentStore.patchState({
      currentPage: page,
      isLoading: true,
      items: []
    });
    this.loadItems();
  }

  public changeSort(field: string): void {
    this.componentStore.patchState((state) => ({
      orderBy: field,
      desc: state.orderBy === field ? !state.desc : false,
      isLoading: true,
      items: []
    }));
    this.loadItems();
  }

  private registerGenerateReportEffect(): void {
    this.generateReportEffect$ = this.componentStore.effect((origin$) =>
      origin$.pipe(
        withLatestFrom(this.formState$),
        filter(([_, formState]) => formState.isValid),
        exhaustMap(([_, { value }]) => {
          this.updateIsLoading(true);
          this.toggleDisablingForm(true);

          return this.tryToGenerateReport(value);
        })
      )
    );
  }

  private tryToGenerateReport(filters: AssetReportFilters): Observable<void> {
    return this.loadMockData(filters).pipe(
      tap((data) => {
        this.updateIsLoading(false);
        this.toggleDisablingForm(false);
        this.updateItems(data);
        this.updatePagination(data.length);

        this.notificationService.success(
          this.translateService.instant('ACCOUNT.REPORTS.ASSET.NOTIFICATIONS.TEXT_REPORT_GENERATED')
        );
      }),
      map(() => void 0)
    );
  }

  private loadMockData(filters: AssetReportFilters): Observable<AssetReportItem[]> {
    // Mock data based on the interface shown in the images
    const mockData: AssetReportItem[] = [
      {
        siteId: '21693 Archived',
        uprn: 'THECARRF01',
        assetId: '130542',
        assetType: 'Electric - Consumer Unit/Distribution System',
        serviceLevel: '5 Year Test and Inspection',
        error: 'Last service 1328 days ago'
      },
      {
        siteId: '21693 Archived',
        uprn: 'THECARRF01',
        assetId: '130542',
        assetType: 'Electric - Consumer Unit/Distribution System',
        serviceLevel: '5 Year Test and Inspection',
        error: 'Service complete outside of due date 58 months 20 days'
      },
      {
        siteId: '21693 Archived',
        uprn: 'THECARRF01',
        assetId: '130542',
        assetType: 'Electric - Consumer Unit/Distribution System',
        serviceLevel: '5 Year Test and Inspection',
        error: 'Last service 1328 days ago'
      },
      {
        siteId: '25107',
        uprn: 'THECARRF02',
        assetId: '130543',
        assetType: 'Pipework',
        serviceLevel: 'Annual',
        error: 'Tag'
      },
      {
        siteId: '25107',
        uprn: 'THECARRF03',
        assetId: '130544',
        assetType: 'Heating System - Wet',
        serviceLevel: '5 Year Test and Inspection',
        error: 'Lorem ipsum very long text on this filter to test the field behavior'
      }
    ];

    // Apply filters
    let filteredData = mockData;

    if (filters.site) {
      filteredData = filteredData.filter((item) => item.siteId.includes(filters.site));
    }

    if (filters.serviceLevel.length > 0) {
      filteredData = filteredData.filter((item) => filters.serviceLevel.includes(item.serviceLevel));
    }

    if (filters.assetType.length > 0) {
      filteredData = filteredData.filter((item) => filters.assetType.includes(item.assetType));
    }

    if (filters.error.length > 0) {
      filteredData = filteredData.filter((item) => filters.error.some((error) => item.error.includes(error)));
    }

    return new Observable((observer) => {
      setTimeout(() => {
        observer.next(filteredData);
        observer.complete();
      }, 1000); // Simulate API delay
    });
  }

  private loadItems(): void {
    this.componentStore
      .select((state) => state.filters)
      .pipe(exhaustMap((filters) => this.loadMockData(filters)))
      .subscribe((data) => {
        this.updateItems(data);
        this.updatePagination(data.length);
        this.updateIsLoading(false);
      });
  }

  private updateItems(items: AssetReportItem[]): void {
    this.componentStore.patchState({ items });
  }

  private updatePagination(totalItems: number): void {
    this.componentStore.patchState((state) => {
      const totalPages = Math.ceil(totalItems / state.perPage);
      return { totalItems, totalPages };
    });
  }

  private updateIsLoading(value: boolean): void {
    this.componentStore.patchState({ isLoading: value });
  }

  private toggleDisablingForm(value: boolean): void {
    this.componentStore.updater((state) => ({
      ...state,
      formState: value ? disable(state.formState) : enable(state.formState)
    }))();
  }

  private updateFormState(action: Actions<any>): void {
    this.componentStore.updater((state) => ({
      ...state,
      formState: formGroupReducer(state.formState, action)
    }))();
  }
}
