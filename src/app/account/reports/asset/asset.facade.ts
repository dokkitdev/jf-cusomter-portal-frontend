import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from '@shared/notification';
import { NotifyService } from '@shared/notify';
import { AppState } from '@shared/store';
import { Actions, disable, enable, formGroupReducer, FormGroupState } from 'ngrx-forms';
import { exhaustMap, filter, Observable, tap, withLatestFrom, map } from 'rxjs';
import { AccountReportsAssetPageState, AssetReportFormFilters } from './asset.state';
import { createAssetFormState } from './shared/forms/asset-form';
import { AssetReportItem, AssetReportQueryParams, AssetReportFilters } from '@shared/notify';
import { tapResponse } from '@ngrx/operators';
import { plainToClass } from 'class-transformer';
import { CustomSelectOption } from '@shared/custom-select/models/select-option';

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

  public get formState$(): Observable<FormGroupState<AssetReportFormFilters>> {
    return this.componentStore.select((state) => state.formState);
  }

  public get availableFilters$(): Observable<any> {
    return this.componentStore.select((state) => state.availableFilters);
  }

  public get siteOptions$(): Observable<CustomSelectOption<number>[]> {
    return this.availableFilters$.pipe(
      map((filters) => {
        if (!filters?.siteIds || !Array.isArray(filters.siteIds)) {
          return [];
        }
        return filters.siteIds.map((id: number) => new CustomSelectOption({ id, title: id.toString() }));
      })
    );
  }

  public get serviceLevelOptions$(): Observable<CustomSelectOption<string>[]> {
    return this.availableFilters$.pipe(
      map((filters) => {
        if (!filters?.serviceLevelNames || !Array.isArray(filters.serviceLevelNames)) {
          return [];
        }
        return filters.serviceLevelNames.map((name: string) => new CustomSelectOption({ id: name, title: name }));
      })
    );
  }

  public get assetTypeOptions$(): Observable<CustomSelectOption<string>[]> {
    return this.availableFilters$.pipe(
      map((filters) => {
        if (!filters?.assetTypes || !Array.isArray(filters.assetTypes)) {
          return [];
        }
        return filters.assetTypes.map((type: string) => new CustomSelectOption({ id: type, title: type }));
      })
    );
  }

  public get errorTypeOptions$(): Observable<CustomSelectOption<string>[]> {
    return this.availableFilters$.pipe(
      map((filters) => {
        if (!filters?.errorTypes || !Array.isArray(filters.errorTypes)) {
          return [];
        }
        return filters.errorTypes.map((type: string) => new CustomSelectOption({ id: type, title: type }));
      })
    );
  }

  public get jobStageOptions$(): Observable<CustomSelectOption<string>[]> {
    return this.availableFilters$.pipe(
      map((filters) => {
        if (!filters?.jobStages || !Array.isArray(filters.jobStages)) {
          return [];
        }
        return filters.jobStages.map((stage: string) => new CustomSelectOption({ id: stage, title: stage }));
      })
    );
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
    private readonly translateService: TranslateService,
    private readonly notifyService: NotifyService
  ) {
    this.resetState();
    this.registerGenerateReportEffect();
    this.loadAvailableFilters();
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

  private tryToGenerateReport(filters: AssetReportFormFilters): Observable<void> {
    return this.notifyService.generateAssetReport().pipe(
      tap(() => {
        this.updateIsLoading(false);
        this.toggleDisablingForm(false);

        this.notificationService.success(
          this.translateService.instant('ACCOUNT.REPORTS.ASSET.NOTIFICATIONS.TEXT_REPORT_GENERATED')
        );
      }),
      tapResponse(
        () => {
          this.updateIsLoading(false);
          this.toggleDisablingForm(false);

          this.notificationService.success(
            this.translateService.instant('ACCOUNT.REPORTS.ASSET.NOTIFICATIONS.TEXT_REPORT_GENERATED')
          );
        },
        (error) => {
          this.updateIsLoading(false);
          this.toggleDisablingForm(false);

          this.notificationService.error(
            this.translateService.instant('ACCOUNT.REPORTS.ASSET.NOTIFICATIONS.TEXT_ERROR')
          );
        }
      )
    );
  }

  private loadAvailableFilters(): void {
    // Load real filters from API
    this.notifyService.getAssetReportFilters().subscribe({
      next: (filters) => {
        // The filters object is already transformed by the service
        // Just use it directly
        this.componentStore.patchState({ availableFilters: filters });
      },
      error: (error) => {
        console.error('Error loading real filters:', error);
        // Use minimal fallback data only on error
        const fallbackFilters = {
          siteIds: [],
          serviceLevelNames: [],
          assetTypes: [],
          errorTypes: [],
          jobStages: []
        };
        this.componentStore.patchState({ availableFilters: fallbackFilters });
      }
    });
  }

  private loadAssetReports(): void {
    this.componentStore
      .select((state) => state.filters)
      .pipe(exhaustMap((filters) => this.searchAssetReports(filters)))
      .subscribe((data) => {
        this.updateItems(data.data);
        this.updatePagination(data.total);
        this.updateIsLoading(false);
      });
  }

  private searchAssetReports(filters: AssetReportFormFilters): Observable<any> {
    return this.componentStore
      .select((state) => ({
        currentPage: state.currentPage,
        perPage: state.perPage,
        orderBy: state.orderBy,
        desc: state.desc
      }))
      .pipe(
        map((state) => {
          const queryParams = new AssetReportQueryParams({
            page: state.currentPage,
            perPage: state.perPage,
            orderBy: state.orderBy,
            desc: state.desc,
            siteId: filters.siteId || undefined,
            serviceLevelNames: filters.serviceLevelNames,
            assetTypes: filters.assetTypes,
            jobStages: filters.jobStages,
            errorTypes: filters.errorTypes
          });

          return this.notifyService.searchAssetReports(queryParams);
        }),
        exhaustMap((obs) => obs)
      );
  }

  private loadItems(): void {
    this.loadAssetReports();
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
