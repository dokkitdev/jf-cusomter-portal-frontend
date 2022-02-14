import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JobCatalog } from '@shared/job';
import { ComponentStore } from '@ngrx/component-store';
import { AccountJobsViewSorsComponentState } from './sors.state';

@Injectable()
export class AccountJobsViewSorsComponentFacade {
  public get isCollapsed$(): Observable<boolean> {
    return this.componentStore.select((state) => state.isCollapsed);
  }

  public get hasCollapsing$(): Observable<boolean> {
    return this.componentStore.select((state) => state.catalogs?.length > state.minVisibleItems);
  }

  public get visibleCatalogs$(): Observable<Array<JobCatalog>> {
    return this.componentStore.select((state) =>
      (state.isCollapsed)
        ? state.catalogs?.slice(0, state.minVisibleItems)
        : state.catalogs
    );
  }

  constructor(
    private readonly componentStore: ComponentStore<AccountJobsViewSorsComponentState>
  ) {
    this.resetState();
  }

  public resetState(): void {
    this.componentStore.setState(new AccountJobsViewSorsComponentState());
  }

  public setCatalogs(value: Array<JobCatalog>): void {
    this.updateCatalogs(value);
  }

  public toggleIsCollapsed(): void {
    this.toggleStateIsCollapsed();
  }

  private toggleStateIsCollapsed(): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        isCollapsed: !state.isCollapsed
      })
    )();
  }

  private updateCatalogs(value: Array<JobCatalog>): void {
    this.componentStore.updater(
      (state) => ({
        ...state,
        catalogs: value
      })
    )();
  }
}
