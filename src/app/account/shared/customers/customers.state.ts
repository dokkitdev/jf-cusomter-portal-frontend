import { createFormArrayState, FormArrayState } from 'ngrx-forms';

export class AccountCustomersComponentState {
  public controlState: FormArrayState<number>;
  public excludeCustomerID: Array<number>;

  constructor() {
    this.controlState = createFormArrayState('', []);
    this.excludeCustomerID = [];
  }
}
