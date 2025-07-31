import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { AccountAssetsViewPageFacade } from './view.facade';
import { Observable } from 'rxjs';
import { Asset } from '@shared/asset';
import { SpinnerDiameter } from '@shared/loading-spinner';

@Component({
  selector: 'account-assets-view-page',
  templateUrl: 'view.html',
  styleUrls: ['view.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class AccountAssetsViewPageComponent implements OnInit, OnDestroy {
  public isLoading$: Observable<boolean>;
  public asset$: Observable<Asset>;
  public spinnerDiameter: typeof SpinnerDiameter;

  constructor(private facade: AccountAssetsViewPageFacade) {
    this.isLoading$ = this.facade.isLoading$;
    this.asset$ = this.facade.asset$;
    this.spinnerDiameter = SpinnerDiameter;
  }

  public ngOnInit(): void {
    this.facade.initPage();
  }

  public ngOnDestroy(): void {
    this.facade.resetState();
  }

  public backClicked(): void {
    this.facade.back();
  }
}
