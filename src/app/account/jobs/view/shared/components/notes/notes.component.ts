import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { JobWorkOrder } from '@shared/job';

@Component({
    selector: 'jobs-view-notes',
    templateUrl: 'notes.html',
    styleUrls: ['notes.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class AccountJobsViewNotesComponent {
  @Input() notes: Array<JobWorkOrder>;
}
