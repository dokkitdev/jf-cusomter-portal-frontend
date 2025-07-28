import { MatDialogRef } from '@angular/material/dialog';
import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { AccountDialogAddDocumentComponentFacade } from './dialog-add-document.facade';
import { Observable } from 'rxjs';
import { Actions, FormGroupState } from 'ngrx-forms';
import { AccountDialogAddDocumentForm } from './forms';
import { ComponentStore } from '@ngrx/component-store';
import { Document } from '@shared/document';
import { configuration } from '@configurations';

@Component({
    selector: 'account-dialog-add-document',
    templateUrl: 'dialog-add-document.html',
    styleUrls: ['dialog-add-document.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        AccountDialogAddDocumentComponentFacade,
        ComponentStore
    ],
    standalone: false
})
export class AccountDialogAddDocumentComponent implements OnDestroy {
  public isEditMode$: Observable<boolean>;
  public isSendingRequest$: Observable<boolean>;
  public document$: Observable<Document>;
  public formState$: Observable<FormGroupState<AccountDialogAddDocumentForm>>;
  public maxFileSize: number;

  constructor(
    private readonly facade: AccountDialogAddDocumentComponentFacade,
    private dialogRef: MatDialogRef<AccountDialogAddDocumentComponent>
  ) {
    this.isSendingRequest$ = this.facade.isSendingRequest$;
    this.document$ = this.facade.document$;
    this.formState$ = this.facade.formState$;
    this.maxFileSize = configuration.maxFileSize.default;
  }

  public ngOnDestroy(): void {
    this.facade.resetState();
  }

  public formSubmitted(): void {
    this.facade.saveChanges();
  }

  public formActionTriggered(action: Actions<any>): void {
    this.facade.handleFormStateAction(action);
  }

  public cancelClicked(): void {
    this.dialogRef.close();
  }
}
