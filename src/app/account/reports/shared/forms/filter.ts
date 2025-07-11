import { ReportType } from '@shared/report';
import { box, Boxed } from 'ngrx-forms';

export class AccountReportsFilterForm {
  public title: string;
  public type: Boxed<Array<ReportType>>;
  public createdAt: string;

  constructor() {
    this.title = '';
    this.type = box([]);
    this.createdAt = '';
  }
}
