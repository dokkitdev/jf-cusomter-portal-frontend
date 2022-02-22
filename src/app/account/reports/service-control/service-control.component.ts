import { AccountReportsServiceControlFacade } from './service-control.facade';
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

@Component({
  selector: 'account-reports-service-control-page',
  templateUrl: 'service-control.html',
  styleUrls: ['service-control.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountReportsServiceControlPageComponent implements OnInit {
  constructor(
    public facade: AccountReportsServiceControlFacade
  ) {}

  public ngOnInit(): void {
    this.facade.loadItems();
  }
}
