import { createFormGroupState, FormGroupState } from 'ngrx-forms';
import { AccountReportsWarehousePageForm } from './shared/forms';

export class AccountReportsWarehousePageState {
  public isSendingRequest: boolean;
  public isReportGenerated: boolean;
  public formState: FormGroupState<AccountReportsWarehousePageForm>;

  constructor() {
    this.isSendingRequest = false;
    this.isReportGenerated = true;
    this.formState = createFormGroupState('AccountReportsWarehousePageForm', new AccountReportsWarehousePageForm());
  }
}
