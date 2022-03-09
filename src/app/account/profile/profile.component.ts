import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountProfilePageFacade } from './profile.facade';

@Component({
  selector: 'account-profile-page',
  templateUrl: 'profile.html',
  styleUrls: ['profile.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountProfilePageComponent implements OnInit, OnDestroy {
  public isLoading$: Observable<boolean>;

  constructor(
    private facade: AccountProfilePageFacade
  ) {
    this.isLoading$ = this.facade.isLoading$;
  }

  public ngOnInit(): void {
    this.facade.initForm();
  }

  public ngOnDestroy(): void {
    this.facade.resetState();
  }
}
