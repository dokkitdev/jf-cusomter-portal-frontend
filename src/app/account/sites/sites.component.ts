import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountSitesPageFacade } from './sites.facade';

@Component({
  selector: 'account-sites-page',
  templateUrl: 'sites.html',
  styleUrls: ['sites.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountSitesPageComponent implements OnInit, OnDestroy {
  public isExporting$: Observable<boolean>;

  constructor(
    private facade: AccountSitesPageFacade
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
