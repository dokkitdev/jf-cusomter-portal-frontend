import { createFormControlState, FormControlState } from 'ngrx-forms';

export class AccountCustomersItemComponentState {
  public controlState: FormControlState<number>;
  public customerControlState: FormControlState<number>;

  constructor() {
    this.controlState = createFormControlState('', 0);
    this.customerControlState = createFormControlState('customerControlState', 0);
  }
}
