import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { configuration } from '@configurations';
import { ComponentStore } from '@ngrx/component-store';
import { heightCollapseAnimation } from '@shared/animations';
import { Job } from '@shared/job';
import { Observable } from 'rxjs';
import { AccountJobsItemComponentFacade } from './item.facade';

@Component({
  selector: 'jobs-item',
  templateUrl: 'item.html',
  styleUrls: ['item.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [heightCollapseAnimation],
  providers: [
    AccountJobsItemComponentFacade,
    ComponentStore
  ]
})
export class AccountJobsItemComponent {
  @Input() item: Job;

  public get description(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.item.description || '');
  }

  public dateFormat: string;
  public timeFormat: string;
  public isDescriptionOpened$: Observable<boolean>;

  constructor(
    private facade: AccountJobsItemComponentFacade,
    private sanitizer: DomSanitizer
  ) {
    this.dateFormat = configuration.dateFormats.jobDate;
    this.timeFormat = configuration.dateFormats.jobTime;
    this.isDescriptionOpened$ = this.facade.isDescriptionOpened$;
  }

  public toggleDescriptionClicked(): void {
    this.facade.toggleIsDescriptionOpened();
  }
}
