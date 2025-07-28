import { ChangeDetectionStrategy, Component, forwardRef, Input, Output, EventEmitter } from '@angular/core';
import { ValidationMessages } from '@shared/validation-errors';
import { Actions, FormControlState, NgrxDefaultViewAdapter, NGRX_FORM_VIEW_ADAPTER } from 'ngrx-forms';

@Component({
    selector: 'form-textarea',
    templateUrl: 'form-textarea.html',
    styleUrls: ['form-textarea.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NGRX_FORM_VIEW_ADAPTER,
            useExisting: forwardRef(() => NgrxDefaultViewAdapter),
            multi: true
        }
    ],
    standalone: false
})
export class FormTextareaComponent {
  @Input() controlState: FormControlState<string>;
  @Input() placeholder: string = '';
  @Input() label: string = '';
  @Input() validationMessages: ValidationMessages;

  @Output() controlStateActionTriggered: EventEmitter<Actions<any>>;

  constructor() {
    this.controlStateActionTriggered = new EventEmitter<Actions<any>>();
  }
}
