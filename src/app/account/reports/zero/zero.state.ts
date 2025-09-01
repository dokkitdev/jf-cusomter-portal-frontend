import { createFormGroupState, FormGroupState } from 'ngrx-forms';
import { AccountReportsZeroPageForm } from './shared/forms';

export class AccountReportsZeroPageState {
  public isSendingRequest: boolean;
  public isReportGenerated: boolean;
  public formState: FormGroupState<AccountReportsZeroPageForm>;

  constructor() {
    this.isSendingRequest = false;
    this.isReportGenerated = false;
    this.formState = createFormGroupState('AccountReportsZeroPageForm', new AccountReportsZeroPageForm());
  }
}
