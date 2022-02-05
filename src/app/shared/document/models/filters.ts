export class DocumentFilters {
  public query?: string;
  public title?: string;
  public createdAtFrom?: string;
  public createdAtTo?: string;

  constructor(model: Partial<DocumentFilters> = {}) {
    Object.assign(this, model);
  }
}
