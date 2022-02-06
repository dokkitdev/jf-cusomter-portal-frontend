import { Document } from '@shared/document';
import { createFormGroupState, FormGroupState } from 'ngrx-forms';
import { AccountDialogAddDocumentForm } from './forms';

export class AccountDialogAddDocumentComponentState {
  public isSendingRequest: boolean;
  public isEditMode: boolean;
  public document: Document;
  public formState: FormGroupState<AccountDialogAddDocumentForm>;

  constructor() {
    this.isSendingRequest = false;
    this.isEditMode = false;
    this.document = new Document();
    this.formState = createFormGroupState('AccountDialogAddDocumentForm', new AccountDialogAddDocumentForm());
  }
}
