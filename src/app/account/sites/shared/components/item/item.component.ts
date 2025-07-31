import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { JobStage } from '@shared/job';
import { Site } from '@shared/site';

@Component({
  selector: 'sites-item',
  templateUrl: 'item.html',
  styleUrls: ['item.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class AccountSitesItemComponent {
  @Input() item: Site;

  public jobStage: typeof JobStage;

  constructor() {
    this.jobStage = JobStage;
  }
}
