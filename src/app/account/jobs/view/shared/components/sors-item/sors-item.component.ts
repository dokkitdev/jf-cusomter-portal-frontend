import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { JobCatalog } from '@shared/job';

@Component({
  selector: 'jobs-view-sors-item',
  templateUrl: 'sors-item.html',
  styleUrls: ['sors-item.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountJobsViewSorsItemComponent {
  @Input() item: JobCatalog;
}
