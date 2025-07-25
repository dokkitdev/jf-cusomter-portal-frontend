import { ChangeDetectionStrategy, Component, forwardRef, Input, Output, EventEmitter } from '@angular/core';
import { ValidationMessages } from '@shared/validation-errors';
import { Actions, FormControlState, NgrxDefaultViewAdapter, NGRX_FORM_VIEW_ADAPTER } from 'ngrx-forms';

@Component({
  selector: 'form-timepicker',
  templateUrl: 'form-timepicker.html',
  styleUrls: ['form-timepicker.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NGRX_FORM_VIEW_ADAPTER,
      useExisting: forwardRef(() => NgrxDefaultViewAdapter),
      multi: true
    }
  ]
})
export class FormTimepickerComponent {
  @Input() controlState: FormControlState<string>;
  @Input() placeholder: string;
  @Input() validationMessages: ValidationMessages;

  @Output() controlStateActionTriggered: EventEmitter<Actions<string>>;

  constructor() {
    this.controlStateActionTriggered = new EventEmitter<Actions<string>>();
  }
}
