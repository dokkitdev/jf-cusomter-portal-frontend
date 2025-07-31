import { Component, ChangeDetectionStrategy, Input, Output } from '@angular/core';
import { configuration } from '@configurations';
import { ComponentStore } from '@ngrx/component-store';
import { Document } from '@shared/document';
import { SpinnerDiameter } from '@shared/loading-spinner';
import { Observable, Subject } from 'rxjs';
import { AccountAdminDocumentsItemComponentFacade } from './item.facade';

@Component({
  selector: 'admin-documents-item',
  templateUrl: 'item.html',
  styleUrls: ['item.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AccountAdminDocumentsItemComponentFacade, ComponentStore],
  standalone: false
})
export class AccountAdminDocumentsItemComponent {
  @Input() item: Document;

  @Output() deletingSuccess: Subject<number>;

  public isSendingRequest$: Observable<boolean>;
  public spinnerDiameter: typeof SpinnerDiameter;
  public dateFormat: string;

  constructor(private facade: AccountAdminDocumentsItemComponentFacade) {
    this.deletingSuccess = this.facade.deletingSuccessSubject;
    this.isSendingRequest$ = this.facade.isSendingRequest$;
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

  public deleteButtonClicked(): void {
    this.facade.deleteItem(this.item.id);
  }
}
