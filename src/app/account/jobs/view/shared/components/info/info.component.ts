import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { configuration } from '@configurations';
import { Job } from '@shared/job';

@Component({
  selector: 'jobs-view-info',
  templateUrl: 'info.html',
  styleUrls: ['info.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountJobsViewInfoComponent {
  @Input() job: Job;

  public get description(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.job.description || '');
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
