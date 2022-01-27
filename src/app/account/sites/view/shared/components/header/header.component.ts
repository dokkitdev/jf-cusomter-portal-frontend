import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Site } from '@shared/site';
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

  constructor(
    private facade: AccountSitesViewPageFacade
  ) {
    this.site$ = this.facade.site$;
  }

  public backClicked(): void {
    this.facade.back();
  }
}
