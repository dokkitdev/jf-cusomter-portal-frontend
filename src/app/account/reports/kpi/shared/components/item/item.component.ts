import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { configuration } from '@configurations';
import { heightCollapseAnimation } from '@shared/animations';
import { Job } from '@shared/job';

@Component({
  selector: 'reports-kpi-item',
  templateUrl: 'item.html',
  styleUrls: ['item.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [heightCollapseAnimation]
})
export class AccountReportsKPIItemComponent {
  @Input() item: Job;

  public get description(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.item.description || '');
  }

  public dateFormat: string;
  public timeFormat: string;

  constructor(
    private sanitizer: DomSanitizer
  ) {
    this.dateFormat = configuration.dateFormats.jobDate;
    this.timeFormat = configuration.dateFormats.jobTime;
  }
}
