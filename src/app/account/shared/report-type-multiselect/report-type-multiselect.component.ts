import {
  Component,
  ChangeDetectionStrategy,
  EventEmitter,
  forwardRef,
  Input,
  Output
} from '@angular/core';
import { Actions, FormControlState, NGRX_FORM_VIEW_ADAPTER, NgrxDefaultViewAdapter, Boxed } from 'ngrx-forms';
import { CustomSelectOption } from '@shared/custom-select/models';
import { ComponentStore } from '@ngrx/component-store';
import { ValidationMessages } from '@shared/validation-errors';
import { AccountReportTypeMultiselectComponentFacade } from './report-type-multiselect.facade';

@Component({
  selector: 'account-report-type-multiselect',
  templateUrl: 'report-type-multiselect.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NGRX_FORM_VIEW_ADAPTER,
      useExisting: forwardRef(() => NgrxDefaultViewAdapter),
      multi: true
    },
    AccountReportTypeMultiselectComponentFacade,
    ComponentStore
  ]
})
export class AccountReportTypeMultiselectComponent {
  @Input() controlState: FormControlState<Boxed<Array<string>>>;
  @Input() validationMessages: ValidationMessages;
  @Input() isPermanentlyShowPlaceholder: boolean;
  @Input() placeholder: string;

  @Output() controlStateActionTriggered: EventEmitter<Actions<any>>;

  public options: Array<CustomSelectOption<string>>;

  constructor(
    private facade: AccountReportTypeMultiselectComponentFacade
  ) {
    this.controlStateActionTriggered = new EventEmitter<Actions<any>>();
    this.options = this.facade.options;
  }
}
