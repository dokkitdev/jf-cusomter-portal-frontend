import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { configuration } from '@configurations';
import { JobSchedule } from '@shared/job';

@Component({
  selector: 'jobs-view-engineers-item',
  templateUrl: 'engineers-item.html',
  styleUrls: ['engineers-item.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class AccountJobsViewEngineersItemComponent {
  @Input() item: JobSchedule;

  public dateFormat: string;
  public timeFormat: string;

  constructor() {
    this.dateFormat = configuration.dateFormats.jobDate;
    this.timeFormat = configuration.dateFormats.jobTime;
  }
}
