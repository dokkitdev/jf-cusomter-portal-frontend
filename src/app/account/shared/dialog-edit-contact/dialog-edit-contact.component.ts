import IMask from 'imask';
import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, Inject } from '@angular/core';
import { AccountDialogEditContactComponentFacade } from './dialog-edit-contact.facade';
import { Observable } from 'rxjs';
import { Actions, FormGroupState } from 'ngrx-forms';
import { AccountDialogEditContactForm } from './forms';
import { ComponentStore } from '@ngrx/component-store';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Contact } from '@shared/contact';
import { configuration } from '@configurations';
import { AccountDialogEditContactData } from './models';

@Component({
  selector: 'account-dialog-edit-contact',
  templateUrl: 'dialog-edit-contact.html',
  styleUrls: ['dialog-edit-contact.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    AccountDialogEditContactComponentFacade,
    ComponentStore
  ]
})
export class AccountDialogEditContactComponent implements OnInit, OnDestroy {
  public isEditMode$: Observable<boolean>;
  public isSendingRequest$: Observable<boolean>;
  public contact$: Observable<Contact>;
  public formState$: Observable<FormGroupState<AccountDialogEditContactForm>>;
  public phoneMask: IMask.AnyMasked;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: AccountDialogEditContactData,
    private readonly dialogRef: MatDialogRef<AccountDialogEditContactComponent>,
    private readonly facade: AccountDialogEditContactComponentFacade
  ) {
    this.isEditMode$ = this.facade.isEditMode$;
    this.isSendingRequest$ = this.facade.isSendingRequest$;
    this.contact$ = this.facade.contact$;
    this.formState$ = this.facade.formState$;
    this.phoneMask = configuration.masks.phone;
  }

  public ngOnInit(): void {
    this.facade.setIsEditMode(this.data?.isEditMode);
    this.facade.setSiteID(this.data?.siteID);
    this.facade.initComponent(this.data?.contact);
  }

  public ngOnDestroy(): void {
    this.facade.resetState();
  }

  public formActionTriggered(action: Actions<any>): void {
    this.facade.handleFormStateAction(action);
  }

  public formSubmitted(): void {
    this.facade.saveChanges();
  }

  public cancelClicked(): void {
    this.dialogRef.close();
  }
}
