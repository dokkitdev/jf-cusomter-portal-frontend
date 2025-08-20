import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { AccountTemplatesPageFacade } from './templates.facade';

@Component({
  selector: 'account-templates-page',
  templateUrl: 'templates.html',
  styleUrls: ['templates.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class AccountTemplatesPageComponent implements OnInit, OnDestroy {
  constructor(private facade: AccountTemplatesPageFacade) {}

  public ngOnInit(): void {
    this.facade.loadTemplates();
  }

  public ngOnDestroy(): void {
    this.facade.resetState();
  }
}
