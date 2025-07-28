import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { configuration } from '@configurations';
import { JobWorkOrder } from '@shared/job';

@Component({
    selector: 'jobs-view-notes-item',
    templateUrl: 'notes-item.html',
    styleUrls: ['notes-item.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class AccountJobsViewNotesItemComponent {
  @Input() item: JobWorkOrder;

  public get description(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.item.description || '');
  }

  public dateFormat: string;

  constructor(
    private sanitizer: DomSanitizer
  ) {
    this.dateFormat = configuration.dateFormats.jobDate;
  }
}
