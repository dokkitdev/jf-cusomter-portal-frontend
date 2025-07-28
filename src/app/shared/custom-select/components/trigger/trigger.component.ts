import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { CustomSelectOption } from '@shared/custom-select';
import { FormControlValueTypes } from 'ngrx-forms';
import { once } from 'lodash';

@Component({
    selector: 'custom-select-trigger',
    templateUrl: 'trigger.html',
    styleUrls: ['trigger.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class CustomSelectTriggerComponent<T extends FormControlValueTypes, V> {
  @Input() customTemplate: TemplateRef<any>;
  @Input() selectedOption: CustomSelectOption<T, V>;
  @Input() placeholder: string;
  @Input() isPermanentlyShowPlaceholder: boolean;
  @Input() hasTriggerIcon: boolean;

  @Output() firstClick: EventEmitter<void>;

  public get triggerText(): string {
    return (this.isPermanentlyShowPlaceholder)
      ? this.placeholder
      : this.selectedOption?.title || this.placeholder;
  }

  public onceClick: () => void;

  constructor() {
    this.firstClick = new EventEmitter();
    this.onceClick = once(() => this.firstClick.emit());
  }

  public triggerClicked(): void {
    this.onceClick();
  }
}
