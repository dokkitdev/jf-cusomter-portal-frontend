import { CustomSelectOption } from '@shared/custom-select';
import { box, Boxed, createFormControlState, FormControlState, FormControlValueTypes } from 'ngrx-forms';

export class CustomMultiselectComponentState<T extends FormControlValueTypes> {
  public options: Array<CustomSelectOption<T>>;
  public controlState: FormControlState<Boxed<Array<T>>>;

  constructor() {
    this.options = [];
    this.controlState = createFormControlState('', box([]));
  }
}
