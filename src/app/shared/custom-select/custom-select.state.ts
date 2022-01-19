import { createFormControlState, FormControlState, FormControlValueTypes } from 'ngrx-forms';
import { CustomSelectOption } from './models';

export class CustomSelectComponentState<T extends FormControlValueTypes> {
  public selectedOption: CustomSelectOption<T> | undefined;
  public options: Array<CustomSelectOption<T>>;
  public controlState: FormControlState<T>;
  public filterControlState: FormControlState<string>;

  constructor() {
    this.selectedOption = undefined;
    this.options = [];
    this.controlState = createFormControlState('', <T>undefined);
    this.filterControlState = createFormControlState('filter', '');
  }
}
