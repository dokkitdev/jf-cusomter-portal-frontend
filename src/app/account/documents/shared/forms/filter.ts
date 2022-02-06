export class AccountDocumentsFilterForm {
  public title: string;
  public query: string;
  public createdAtFrom: string;
  public createdAtTo: string;

  constructor() {
    this.title = '';
    this.query = '';
    this.createdAtFrom = '';
    this.createdAtTo = '';
  }
}
