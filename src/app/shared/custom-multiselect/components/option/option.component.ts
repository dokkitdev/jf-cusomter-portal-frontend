import { ChangeDetectionStrategy, Component, Input, Output, TemplateRef, EventEmitter } from '@angular/core';
import { CustomSelectOption } from '@shared/custom-select';
import { FormControlValueTypes } from 'ngrx-forms';

@Component({
  selector: 'custom-multiselect-option',
  templateUrl: 'option.html',
  styleUrls: ['option.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomMultiselectOptionComponent<T extends FormControlValueTypes, V> {
  @Input() option: CustomSelectOption<T, V>;
  @Input() isSelected: boolean;
  @Input() customTemplate: TemplateRef<any>;

  @Output() optionClick: EventEmitter<T>;

  constructor() {
    this.optionClick = new EventEmitter();
  }

  public optionClicked(id: T): void {
    this.optionClick.emit(id);
  }
}
