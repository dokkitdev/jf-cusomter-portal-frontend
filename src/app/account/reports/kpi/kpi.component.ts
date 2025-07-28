import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountReportsKPIPageFacade } from './kpi.facade';

@Component({
    selector: 'account-reports-kpi-page',
    templateUrl: 'kpi.html',
    styleUrls: ['kpi.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class AccountReportsKPIComponent implements OnInit, OnDestroy {
  public isExporting$: Observable<boolean>;

  constructor(
    private facade: AccountReportsKPIPageFacade
  ) {
    this.isExporting$ = this.facade.isExporting$;
  }

  public ngOnInit(): void {
    this.facade.loadItems();
  }

  public ngOnDestroy(): void {
    this.facade.resetState();
  }

  public exportClicked(): void {
    this.facade.exportCSV();
  }
}
