import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { JobCatalog } from '@shared/job';
import { Observable } from 'rxjs';
import { AccountJobsViewSorsComponentFacade } from './sors.facade';

@Component({
  selector: 'jobs-view-sors',
  templateUrl: 'sors.html',
  styleUrls: ['sors.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    AccountJobsViewSorsComponentFacade,
    ComponentStore
  ]
})
export class AccountJobsViewSorsComponent {
  @Input()
  public set catalogs(value: Array<JobCatalog>) {
    this.facade.setCatalogs(value);
  }

  public visibleCatalogs$: Observable<Array<JobCatalog>>;
  public hasCollapsing$: Observable<boolean>;
  public isCollapsed$: Observable<boolean>;

  constructor(
    private facade: AccountJobsViewSorsComponentFacade
  ) {
    this.visibleCatalogs$ = this.facade.visibleCatalogs$;
    this.hasCollapsing$ = this.facade.hasCollapsing$;
    this.isCollapsed$ = this.facade.isCollapsed$;
  }

  public toggleCollapseClicked(): void {
    this.facade.toggleIsCollapsed();
  }
}
