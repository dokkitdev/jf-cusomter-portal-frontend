import { Document, DocumentRelationType, DocumentSortField } from '@shared/document';

export class AccountAdminDocumentsPageState {
  public isLoading: boolean;
  public isLoadingToPage: boolean;
  public items: Array<Document>;
  public totalItems: number;
  public page: number;
  public perPage: number;
  public orderBy: DocumentSortField;
  public relations: Array<DocumentRelationType>;
  public desc: boolean;

  constructor() {
    this.isLoading = false;
    this.isLoadingToPage = false;
    this.items = [];
    this.totalItems = 0;
    this.page = 1;
    this.perPage = 15;
    this.orderBy = DocumentSortField.TITLE;
    this.relations = ['media'];
    this.desc = false;
  }
}
