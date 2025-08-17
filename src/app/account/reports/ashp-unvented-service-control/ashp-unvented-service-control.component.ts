import { AccountReportsServiceControlFacade } from './ashp-unvented-service-control.facade';
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'account-reports-service-control-page',
  templateUrl: 'ashp-unvented-service-control.html',
  styleUrls: ['ashp-unvented-service-control.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountReportsASHPUnventedServiceControlPageComponent implements OnInit {
  public isExporting$: Observable<boolean>;

  constructor(
    public facade: AccountReportsServiceControlFacade
  ) {
    this.isExporting$ = this.facade.isExporting$;
  }

  public ngOnInit(): void {
    this.facade.loadItems();
  }

  public exportClicked(): void {
    this.facade.exportCSV();
  }
}
