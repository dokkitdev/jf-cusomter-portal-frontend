import { AccountReportsServiceControlFacade } from './service-control.facade';
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'account-reports-service-control-page',
  templateUrl: 'service-control.html',
  styleUrls: ['service-control.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class AccountReportsServiceControlPageComponent implements OnInit {
  public isExporting$: Observable<boolean>;

  constructor(public facade: AccountReportsServiceControlFacade) {
    this.isExporting$ = this.facade.isExporting$;
  }

  public ngOnInit(): void {
    this.facade.loadItems();
  }

  public exportClicked(): void {
    this.facade.exportCSV();
  }
}
