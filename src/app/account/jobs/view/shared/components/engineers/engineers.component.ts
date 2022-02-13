import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { JobSchedule } from '@shared/job';

@Component({
  selector: 'jobs-view-engineers',
  templateUrl: 'engineers.html',
  styleUrls: ['engineers.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountJobsViewEngineersComponent {
  @Input() schedules: Array<JobSchedule>;
}
