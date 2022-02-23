import { AccountJobStageSelectComponentFacade } from './job-stage-select.facade';
import { CustomSelectOption } from '@shared/custom-select';
import { ValidationMessages } from '@shared/validation-errors';
import { Component, ChangeDetectionStrategy, Input, EventEmitter, Output, forwardRef } from '@angular/core';
import { Actions, Boxed, FormControlState, NgrxDefaultViewAdapter, NGRX_FORM_VIEW_ADAPTER } from 'ngrx-forms';
import { ComponentStore } from '@ngrx/component-store';

@Component({
  selector: 'account-job-stage-select',
  templateUrl: 'job-stage-select.html',
  styleUrls: ['job-stage-select.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NGRX_FORM_VIEW_ADAPTER,
      useExisting: forwardRef(() => NgrxDefaultViewAdapter),
      multi: true
    },
    AccountJobStageSelectComponentFacade,
    ComponentStore
  ]
})
export class AccountJobStageSelectComponent {
  @Input() controlState: FormControlState<Boxed<Array<string>>>;
  @Input() validationMessages: ValidationMessages;
  @Input() isPermanentlyShowPlaceholder: boolean;
  @Input() placeholder: string;

  @Output() controlStateActionTriggered: EventEmitter<Actions<any>>;

  public options: Array<CustomSelectOption<string>>;

  constructor(
    private facade: AccountJobStageSelectComponentFacade
  ) {
    this.controlStateActionTriggered = new EventEmitter<Actions<any>>();
    this.options = this.facade.options;
  }
}
