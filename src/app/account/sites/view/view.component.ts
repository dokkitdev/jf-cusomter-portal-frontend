import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { AccountSitesViewPageFacade } from './view.facade';
import { Observable } from 'rxjs';
import { Site } from '@shared/site';
import { SpinnerDiameter } from '@shared/loading-spinner';
import { Actions, FormGroupState } from 'ngrx-forms';
import { AccountSiteViewEditForm } from './shared/forms';
import { Contact } from '@shared/contact';

@Component({
  selector: 'account-sites-view-page',
  templateUrl: 'view.html',
  styleUrls: ['view.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountSitesViewPageComponent implements OnInit, OnDestroy {
  public formState$: Observable<FormGroupState<AccountSiteViewEditForm>>;
  public isLoading$: Observable<boolean>;
  public spinnerDiameter: typeof SpinnerDiameter;

  constructor(
    private facade: AccountSitesViewPageFacade
  ) {
    this.formState$ = this.facade.formState$;
    this.isLoading$ = this.facade.isLoading$;
    this.spinnerDiameter = SpinnerDiameter;
  }

  public ngOnInit(): void {
    this.facade.initPage();
  }

  public ngOnDestroy(): void {
    this.facade.resetState();
  }
}
