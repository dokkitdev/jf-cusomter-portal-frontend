import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { AccountReportsGeneralPageFacade } from './general.facade';

@Component({
  selector: 'account-reports-general-page',
  templateUrl: 'general.html',
  styleUrls: ['general.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class AccountReportsGeneralComponent implements OnInit, OnDestroy {
  constructor(public facade: AccountReportsGeneralPageFacade) {}

  public ngOnInit(): void {
    this.facade.loadItems();
  }

  public ngOnDestroy(): void {
    this.facade.resetState();
  }
}
