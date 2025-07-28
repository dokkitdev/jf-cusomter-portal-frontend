import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { JobAttachment } from '@shared/job';
import { AccountJobsViewPageFacade } from '../../../view.facade';

@Component({
    selector: 'jobs-view-attachments',
    templateUrl: 'attachments.html',
    styleUrls: ['attachments.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class AccountJobsViewAttachmentsComponent {
  @Input() attachments: Array<JobAttachment>;

  constructor(
    private facade: AccountJobsViewPageFacade
  ) { }

  public downloadAttachmentClicked(item: JobAttachment): void {
    this.facade.downloadAttachment(item);
  }
}
