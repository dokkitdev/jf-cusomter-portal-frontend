import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, Inject } from '@angular/core';
import { AccountDialogJobRequestComponentFacade } from './dialog-job-request.facade';
import { Observable } from 'rxjs';
import { Actions, FormGroupState } from 'ngrx-forms';
import { AccountDialogJobRequestForm } from './forms';
import { ComponentStore } from '@ngrx/component-store';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Media } from '@shared/media';
import { configuration } from '@configurations';
import { AccountDialogJobRequestData } from './models';

@Component({
  selector: 'account-dialog-job-request',
  templateUrl: 'dialog-job-request.html',
  styleUrls: ['dialog-job-request.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AccountDialogJobRequestComponentFacade, ComponentStore],
  standalone: false
})
export class AccountDialogJobRequestComponent implements OnInit, OnDestroy {
  public isSendingRequest$: Observable<boolean>;
  public formState$: Observable<FormGroupState<AccountDialogJobRequestForm>>;
  public maxFileSize: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: AccountDialogJobRequestData,
    private readonly dialogRef: MatDialogRef<AccountDialogJobRequestComponent>,
    private readonly facade: AccountDialogJobRequestComponentFacade
  ) {
    this.isSendingRequest$ = this.facade.isSendingRequest$;
    this.formState$ = this.facade.formState$;
    this.maxFileSize = configuration.maxFileSize.jobAttachment;
  }

  public ngOnInit(): void {
    this.facade.setSiteID(this.data?.siteID);
  }

  public ngOnDestroy(): void {
    this.facade.resetState();
  }

  public formActionTriggered(action: Actions<any>): void {
    this.facade.handleFormStateAction(action);
  }

  public formSubmitted(): void {
    this.facade.createRequest();
  }

  public attachmentsChanged(items: Array<Media>): void {
    this.facade.changeAttachments(items);
  }

  public cancelClicked(): void {
    this.dialogRef.close();
  }
}
