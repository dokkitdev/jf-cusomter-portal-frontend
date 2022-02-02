import { Component, forwardRef, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { NgrxRadioViewAdapter, NGRX_FORM_VIEW_ADAPTER, NgrxDefaultViewAdapter, FormControlState, FormControlValueTypes, Actions } from 'ngrx-forms';

@Component({
  selector: 'form-radio',
  templateUrl: 'form-radio.html',
  styleUrls: ['form-radio.scss'],
  providers: [{
    provide: NGRX_FORM_VIEW_ADAPTER,
    useExisting: forwardRef(() => NgrxDefaultViewAdapter),
    multi: true,
  }]
})
export class FormRadioComponent {
  @Input() controlState: FormControlState<FormControlValueTypes>;
  @Input() value: string;

  @Output() controlStateActionTriggered: EventEmitter<Actions<any>>;

  public get name(): string {
    return this.controlState.id;
  }

  constructor() {
    this.controlStateActionTriggered = new EventEmitter();
  }
}
