import { DocumentSortField } from '@shared/document';

export class AccountDocumentsQueryParameters {
  public page: number;
  public perPage: number;
  public orderBy: DocumentSortField;
  public desc: boolean;
  public title: string;
  public query: string;
  public createdAtFrom: string;
  public createdAtTo: string;

  constructor(model: Partial<AccountDocumentsQueryParameters> = {}) {
    Object.assign(this, model);
  }
}
