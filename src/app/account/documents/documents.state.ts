import { Document, DocumentRelationType, DocumentSortField } from '@shared/document';
import { createFormGroupState, FormGroupState } from 'ngrx-forms';
import { AccountDocumentsFilterForm } from './shared/forms';

export class AccountDocumentsPageState {
  public isLoading: boolean;
  public isLoadingToPage: boolean;
  public items: Array<Document>;
  public totalItems: number;
  public page: number;
  public perPage: number;
  public orderBy: DocumentSortField;
  public relations: Array<DocumentRelationType>;
  public desc: boolean;
  public filterFormState: FormGroupState<AccountDocumentsFilterForm>;

  constructor() {
    this.isLoading = false;
    this.isLoadingToPage = false;
    this.items = [];
    this.totalItems = 0;
    this.page = 1;
    this.perPage = 10;
    this.orderBy = DocumentSortField.TITLE;
    this.relations = ['media'];
    this.desc = false;
    this.filterFormState = createFormGroupState('AccountDocumentsFilterForm', new AccountDocumentsFilterForm());
  }
}
