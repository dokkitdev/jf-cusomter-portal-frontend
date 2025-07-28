import {
  Component,
  ChangeDetectionStrategy,
  EventEmitter,
  forwardRef,
  Input,
  Output
} from '@angular/core';
import { Actions, FormControlState, NGRX_FORM_VIEW_ADAPTER, NgrxDefaultViewAdapter, Boxed } from 'ngrx-forms';
import { AccountJobStageMultiselectComponentFacade } from './job-stage-multiselect.facade';
import { CustomSelectOption } from '@shared/custom-select/models';
import { ComponentStore } from '@ngrx/component-store';
import { ValidationMessages } from '@shared/validation-errors';

@Component({
    selector: 'account-job-stage-multiselect',
    templateUrl: 'job-stage-multiselect.html',
    styleUrls: ['job-stage-multiselect.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NGRX_FORM_VIEW_ADAPTER,
            useExisting: forwardRef(() => NgrxDefaultViewAdapter),
            multi: true
        },
        AccountJobStageMultiselectComponentFacade,
        ComponentStore
    ],
    standalone: false
})
export class AccountJobStageMultiselectComponent {
  @Input() controlState: FormControlState<Boxed<Array<string>>>;
  @Input() validationMessages: ValidationMessages;
  @Input() isPermanentlyShowPlaceholder: boolean;
  @Input() placeholder: string;

  @Output() controlStateActionTriggered: EventEmitter<Actions<any>>;

  public options: Array<CustomSelectOption<string>>;

  constructor(
    private facade: AccountJobStageMultiselectComponentFacade
  ) {
    this.controlStateActionTriggered = new EventEmitter<Actions<any>>();
    this.options = this.facade.options;
  }
}
