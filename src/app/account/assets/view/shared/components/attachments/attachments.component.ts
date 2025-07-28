import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { AssetAttachment } from '@shared/asset';
import { AccountAssetsViewPageFacade } from '../../../view.facade';

@Component({
    selector: 'account-assets-view-attachments',
    templateUrl: 'attachments.html',
    styleUrls: ['attachments.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class AccountAssetsViewAttachmentsComponent {
  @Input() items: Array<AssetAttachment>;

  constructor(
    private facade: AccountAssetsViewPageFacade
  ) { }

  public downloadAttachmentClicked(item: AssetAttachment): void {
    this.facade.downloadAttachment(item);
  }
}
