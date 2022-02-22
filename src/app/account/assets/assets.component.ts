import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountAssetsPageFacade } from './assets.facade';

@Component({
  selector: 'account-assets-page',
  templateUrl: 'assets.html',
  styleUrls: ['assets.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountAssetsPageComponent implements OnInit, OnDestroy {
  public isExporting$: Observable<boolean>;

  constructor(
    private facade: AccountAssetsPageFacade
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
