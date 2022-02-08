import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Site } from '@shared/site';
import { User } from '@shared/user';
import { Observable } from 'rxjs';
import { AccountSitesViewPageFacade } from '../../../view.facade';

@Component({
  selector: 'account-sites-view-header',
  templateUrl: 'header.html',
  styleUrls: ['header.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountSitesViewHeaderComponent {
  public site$: Observable<Site>;
  public profile$: Observable<User>;

  constructor(
    private facade: AccountSitesViewPageFacade
  ) {
    this.site$ = this.facade.site$;
    this.profile$ = this.facade.profile$;
  }

  public sendJobRequestClicked(): void {
    this.facade.openJobRequestDialog();
  }

  public backClicked(): void {
    this.facade.back();
  }
}
