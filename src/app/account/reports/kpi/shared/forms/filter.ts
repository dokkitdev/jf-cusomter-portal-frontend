export class AccountReportsKPIFilterForm {
  public uprn: string;
  public archived: boolean | undefined;
  public dateCreatedFrom: string;
  public dateCreatedTo: string;

  constructor() {
    this.uprn = '';
    this.archived = undefined;
    this.dateCreatedFrom = '';
    this.dateCreatedTo = '';
  }
}
