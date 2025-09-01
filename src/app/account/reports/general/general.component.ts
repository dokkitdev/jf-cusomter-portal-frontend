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
    // TODO: Add initialization logic
  }

  public ngOnDestroy(): void {
    // TODO: Add cleanup logic
  }

  public onSortChanged(event: any): void {
    // TODO: Implement sorting logic
  }

  public onDownloadClicked(item: any): void {
    // TODO: Implement download logic
  }
}
