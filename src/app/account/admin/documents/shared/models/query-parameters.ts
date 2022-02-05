import { DocumentSortField } from '@shared/document';

export class AccountAdminDocumentsQueryParameters {
  public page: number;
  public perPage: number;
  public orderBy: DocumentSortField;
  public desc: boolean;

  constructor(model: Partial<AccountAdminDocumentsQueryParameters> = {}) {
    Object.assign(this, model);
  }
}
