import { ChangeDetectionStrategy, Component, forwardRef, Input, Output, EventEmitter } from '@angular/core';
import { FormControlState, NGRX_FORM_VIEW_ADAPTER, NgrxCheckboxViewAdapter, Actions } from 'ngrx-forms';

@Component({
  selector: 'form-checkbox',
  templateUrl: 'form-checkbox.html',
  styleUrls: ['form-checkbox.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NGRX_FORM_VIEW_ADAPTER,
      useExisting: forwardRef(() => NgrxCheckboxViewAdapter),
      multi: true
    }
  ]
})
export class FormCheckboxComponent {
  @Input() controlState: FormControlState<boolean>;
  @Input() isChecked: boolean;
  @Input() isDisabled: boolean;
  @Input() label: string;

  @Output() controlStateActionTriggered: EventEmitter<Actions<boolean>>;
  @Output() toggleClicked: EventEmitter<void>;

  constructor() {
    this.controlStateActionTriggered = new EventEmitter<Actions<boolean>>();
    this.toggleClicked = new EventEmitter<void>();
  }
}
