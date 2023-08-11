import { Boxed, box } from 'ngrx-forms';

export class AccountReportsKPIFilterForm {
  public uprn: string;
  public costCenterName: Boxed<Array<string>>;
  public archived: boolean | undefined;
  public dateCreatedFrom: string;
  public dateCreatedTo: string;
  public isRepair: boolean;

  constructor() {
    this.uprn = '';
    this.costCenterName = box([]);
    this.archived = undefined;
    this.dateCreatedFrom = '';
    this.dateCreatedTo = '';
    this.isRepair = true;
  }
}
