import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from '@shared/notification';
import { NotifyService, AssetReportItem, AssetReportPaginationRequest, AssetReportFilters } from '@shared/notify';
import { AppState } from '@shared/store';
import { Actions, disable, enable, formGroupReducer, FormGroupState, SetValueAction, unbox } from 'ngrx-forms';
import { AssetReportSortField } from '@shared/notify/types';
import { exhaustMap, filter, Observable, withLatestFrom, map, startWith, switchMap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { AccountReportsAssetPageState, AssetReportFormFilters } from './asset.state';
import { createAssetFormState } from './shared/forms/asset-form';
import { plainToClass } from 'class-transformer';
import { CustomSelectOption } from '@shared/custom-select/models/select-option';

@Injectable()
export class AccountReportsAssetPageFacade extends ComponentStore<AccountReportsAssetPageState> {
  public get items$(): Observable<Array<AssetReportItem>> {
    return this.select((state) => state.items);
  }

  public get isLoading$(): Observable<boolean> {
    return this.select((state) => state.isLoading);
  }

  public get isGeneratingReport$(): Observable<boolean> {
    return this.select((state) => state.isGeneratingReport);
  }

  public get page$(): Observable<number> {
    return this.select((state) => state.page);
  }

  public get currentPage$(): Observable<number> {
    return this.select((state) => state.page);
  }

  public get totalPages$(): Observable<number> {
    return this.select((state) => state.totalPages);
  }

  public get totalItems$(): Observable<number> {
    return this.select((state) => state.totalItems);
  }

  public get perPage$(): Observable<number> {
    return this.select((state) => state.perPage);
  }

  public get hasPagination$(): Observable<boolean> {
    return this.select((state) => state.totalItems > 0);
  }

  public get paginationID$(): Observable<string> {
    return this.select((state) => state.paginationID);
  }

  public get orderBy$(): Observable<AssetReportSortField> {
    return this.select((state) => state.orderBy);
  }

  public get desc$(): Observable<boolean> {
    return this.select((state) => state.desc);
  }

  public get formState$(): Observable<FormGroupState<AssetReportFormFilters>> {
    return this.select((state) => state.formState);
  }

  public get availableFilters$(): Observable<any> {
    return this.select((state) => state.availableFilters);
  }

  public get siteOptions$(): Observable<Array<CustomSelectOption<number>>> {
    return this.availableFilters$.pipe(
      startWith({ siteIds: [], serviceLevelNames: [], assetTypes: [], errorTypes: [], jobStages: [] }),
      map((filters) => {
        if (!filters?.siteIds || !Array.isArray(filters.siteIds)) {
          return [];
        }

        return filters.siteIds.map((id: number) => new CustomSelectOption({ id, title: id.toString() }));
      })
    );
  }

  public get serviceLevelOptions$(): Observable<Array<CustomSelectOption<string>>> {
    return this.availableFilters$.pipe(
      startWith({ siteIds: [], serviceLevelNames: [], assetTypes: [], errorTypes: [], jobStages: [] }),
      map((filters) => {
        if (!filters?.serviceLevelNames || !Array.isArray(filters.serviceLevelNames)) {
          return [];
        }

        return filters.serviceLevelNames.map((name: string) => new CustomSelectOption({ id: name, title: name }));
      })
    );
  }

  public get assetTypeOptions$(): Observable<Array<CustomSelectOption<string>>> {
    return this.availableFilters$.pipe(
      startWith({ siteIds: [], serviceLevelNames: [], assetTypes: [], errorTypes: [], jobStages: [] }),
      map((filters) => {
        if (!filters?.assetTypes || !Array.isArray(filters.assetTypes)) {
          return [];
        }

        return filters.assetTypes.map((type: string) => new CustomSelectOption({ id: type, title: type }));
      })
    );
  }

  public get errorTypeOptions$(): Observable<Array<CustomSelectOption<string>>> {
    return this.availableFilters$.pipe(
      startWith({ siteIds: [], serviceLevelNames: [], assetTypes: [], errorTypes: [], jobStages: [] }),
      map((filters) => {
        if (!filters?.errorTypes || !Array.isArray(filters.errorTypes)) {
          return [];
        }

        return filters.errorTypes.map((type: string) => new CustomSelectOption({ id: type, title: type }));
      })
    );
  }

  public get jobStageOptions$(): Observable<Array<CustomSelectOption<string>>> {
    return this.availableFilters$.pipe(
      startWith({ siteIds: [], serviceLevelNames: [], assetTypes: [], errorTypes: [], jobStages: [] }),
      map((filters) => {
        if (!filters?.jobStages || !Array.isArray(filters.jobStages)) {
          return [];
        }

        return filters.jobStages.map((stage: string) => new CustomSelectOption({ id: stage, title: stage }));
      })
    );
  }

  public get parameters$(): Observable<any> {
    return this.select(this.page$, this.orderBy$, this.desc$, (page, orderBy, desc) => ({ page, orderBy, desc }));
  }

  public readonly setPage = this.updater((state, page: number) => ({
    ...state,
    page
  }));

  public readonly updateSort = this.updater((state, parameters: { orderBy: AssetReportSortField; desc: boolean }) => ({
    ...state,
    orderBy: parameters.orderBy,
    desc: parameters.desc,
    page: 1
  }));

  public readonly setIsLoading = this.updater((state, isLoading: boolean) => ({
    ...state,
    isLoading
  }));

  public readonly setIsGeneratingReport = this.updater((state, isGeneratingReport: boolean) => ({
    ...state,
    isGeneratingReport
  }));

  private generateReportEffect$: () => Observable<void>;

  private readonly loadItemsEffect$ = this.effect((origin$: Observable<void>) =>
    origin$.pipe(
      switchMap(() => {
        const state = this.get();

        return this.searchAssetReports(state.formState.value).pipe(
          tapResponse(
            (response) => this.onLoadItemsSuccess(response),
            (error: HttpErrorResponse) => this.onLoadItemsError(error)
          )
        );
      })
    )
  );

  constructor(
    private readonly store: Store<AppState>,
    private readonly notificationService: NotificationService,
    private readonly translateService: TranslateService,
    private readonly notifyService: NotifyService
  ) {
    super(new AccountReportsAssetPageState());
    this.resetState();
    this.registerGenerateReportEffect();
    this.loadAvailableFilters();
  }

  public resetState(): void {
    const initialState = new AccountReportsAssetPageState();
    initialState.formState = createAssetFormState();
    this.setState(initialState);
  }

  public generateReport(): void {
    this.generateReportEffect$();
  }

  public handleFormStateAction(action: Actions<any>): void {
    this.updateFormState(action);

    if (action instanceof SetValueAction) {
      this.patchState({ page: 1 });
      this.loadItems();
    }
  }

  public changePage(page: number): void {
    this.setPage(page);
    this.patchState({
      isLoading: true,
      items: []
    });
    this.loadItems();
  }

  public changeSort(field: AssetReportSortField): void {
    const currentState = this.get();
    const desc = currentState.orderBy === field ? !currentState.desc : false;

    this.updateSort({ orderBy: field, desc });
    this.patchState({
      isLoading: true,
      items: []
    });
    this.loadItems();
  }

  public loadItems(): void {
    this.setIsLoading(true);
    this.loadItemsEffect$();
  }

  public refreshData(): void {
    this.patchState({
      page: 1,
      isLoading: true,
      items: []
    });
    this.loadItems();
  }

  private registerGenerateReportEffect(): void {
    this.generateReportEffect$ = this.effect((origin$) =>
      origin$.pipe(
        withLatestFrom(this.formState$),
        filter(([_, formState]) => formState.isValid),
        exhaustMap(([_, { value }]) => {
          this.setIsGeneratingReport(true);
          this.toggleDisablingForm(true);

          return this.tryToGenerateReport(value);
        })
      )
    );
  }

  private tryToGenerateReport(filters: AssetReportFormFilters): Observable<void> {
    return this.notifyService.generateAssetReport().pipe(
      tapResponse(
        () => {
          this.setIsGeneratingReport(false);
          this.toggleDisablingForm(false);

          this.notificationService.success(
            this.translateService.instant('ACCOUNT.REPORTS.ASSET.NOTIFICATIONS.TEXT_REPORT_GENERATED')
          );
        },
        (error) => {
          this.setIsGeneratingReport(false);
          this.toggleDisablingForm(false);

          this.notificationService.error(
            this.translateService.instant('ACCOUNT.REPORTS.ASSET.NOTIFICATIONS.TEXT_ERROR')
          );
        }
      )
    );
  }

  private loadAvailableFilters(): void {
    this.notifyService.getAssetReportFilters().subscribe({
      next: (filters) => {
        this.patchState({ availableFilters: filters });
      },
      error: (error) => {
        const fallbackFilters = {
          siteIds: [],
          serviceLevelNames: [],
          assetTypes: [],
          errorTypes: [],
          jobStages: []
        };

        this.patchState({ availableFilters: fallbackFilters });
      }
    });
  }

  private updateItems(items: Array<AssetReportItem>): void {
    this.patchState({ items });
  }

  private updatePagination(totalItems: number): void {
    this.patchState((state) => {
      const totalPages = Math.ceil(totalItems / state.perPage);

      return { totalItems, totalPages };
    });
  }

  private updateIsLoading(value: boolean): void {
    this.patchState({ isLoading: value });
  }

  private onLoadItemsSuccess(response: any): void {
    this.patchState({
      items: response.items,
      totalPages: Math.ceil(response.totalItems / this.get().perPage),
      totalItems: response.totalItems,
      isLoading: false
    });
  }

  private onLoadItemsError(error: HttpErrorResponse): void {
    this.setIsLoading(false);
    this.notificationService.error(this.translateService.instant('ACCOUNT.REPORTS.ASSET.NOTIFICATIONS.TEXT_ERROR'));
  }

  private toggleDisablingForm(value: boolean): void {
    this.updater((state) => ({
      ...state,
      formState: value ? disable(state.formState) : enable(state.formState)
    }))();
  }

  private updateFormState(action: Actions<any>): void {
    this.updater((state) => ({
      ...state,
      formState: formGroupReducer(state.formState, action)
    }))();
  }

  private searchAssetReports(filters: AssetReportFormFilters): Observable<any> {
    return this.select((state) => ({
      page: state.page,
      perPage: state.perPage,
      orderBy: state.orderBy,
      desc: state.desc
    })).pipe(
      map((state) => {
        const queryParams = new AssetReportPaginationRequest({
          page: state.page,
          perPage: state.perPage,
          orderBy: state.orderBy,
          desc: state.desc,
          siteId: filters.siteId || undefined,
          serviceLevelNames: unbox(filters.serviceLevelNames),
          assetTypes: unbox(filters.assetTypes),
          jobStages: unbox(filters.jobStages),
          errorTypes: unbox(filters.errorTypes)
        });

        return this.notifyService.searchAssetReports(queryParams);
      }),
      exhaustMap((obs) => obs)
    );
  }
}
