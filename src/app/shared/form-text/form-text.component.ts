import IMask from 'imask';
import { ChangeDetectionStrategy, Component, forwardRef, Input, Output, EventEmitter } from '@angular/core';
import { ValidationMessages } from '@shared/validation-errors';
import { FormControlState, NgrxDefaultViewAdapter, NGRX_FORM_VIEW_ADAPTER, Actions } from 'ngrx-forms';

@Component({
    selector: 'form-text',
    templateUrl: 'form-text.html',
    styleUrls: ['form-text.scss'],
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
export class FormTextComponent {
  @Input() controlState: FormControlState<string>;
  @Input() type: string;
  @Input() autocomplete: string;
  @Input() placeholder: string;
  @Input() label: string;
  @Input() description: string;
  @Input() validationMessages: ValidationMessages;
  @Input() mask: IMask.AnyMasked;

  @Output() controlStateActionTriggered: EventEmitter<Actions<any>>;

  constructor() {
    this.controlStateActionTriggered = new EventEmitter<Actions<any>>();
    this.type = 'text';
    this.autocomplete = 'off';
    this.placeholder = '';
    this.label = '';
    this.description = '';
  }
}
