import { createFormArrayState, FormArrayState } from 'ngrx-forms';

export class AccountCustomersComponentState {
  public controlState: FormArrayState<number>;
  public customersControlState: FormArrayState<number>;
  public excludeCustomerID: Array<number>;

  constructor() {
    this.controlState = createFormArrayState('', []);
    this.customersControlState = createFormArrayState('customersArrayState', []);
    this.excludeCustomerID = [];
  }
}
