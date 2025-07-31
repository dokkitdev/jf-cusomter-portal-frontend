import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { AccountDocumentsPageFacade } from '@app/account/documents/documents.facade';
import { configuration } from '@configurations';
import { Document } from '@shared/document';
import { SpinnerDiameter } from '@shared/loading-spinner';

@Component({
  selector: 'documents-item',
  templateUrl: 'item.html',
  styleUrls: ['item.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class AccountDocumentsItemComponent {
  @Input() item: Document;

  public spinnerDiameter: typeof SpinnerDiameter;
  public dateFormat: string;

  constructor(private facade: AccountDocumentsPageFacade) {
    this.spinnerDiameter = SpinnerDiameter;
    this.dateFormat = configuration.dateFormats.documentDate;
  }

  public viewMediaClicked(): void {
    if (this.item.media) {
      this.facade.viewMedia(this.item.media);
    }
  }

  public downloadMediaClicked(): void {
    if (this.item.media) {
      this.facade.downloadMedia(this.item.media);
    }
  }
}
