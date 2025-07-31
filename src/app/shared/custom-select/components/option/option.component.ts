import { ChangeDetectionStrategy, Component, Input, Output, TemplateRef, EventEmitter } from '@angular/core';
import { CustomSelectOption } from '@shared/custom-select';
import { FormControlValueTypes } from 'ngrx-forms';

@Component({
  selector: 'custom-select-option',
  templateUrl: 'option.html',
  styleUrls: ['option.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class CustomSelectOptionComponent<T extends FormControlValueTypes, V> {
  @Input() option: CustomSelectOption<T, V>;
  @Input() customTemplate: TemplateRef<any>;

  @Output() optionClick: EventEmitter<T>;

  constructor() {
    this.optionClick = new EventEmitter();
  }

  public optionClicked(id: T): void {
    this.optionClick.emit(id);
  }
}
