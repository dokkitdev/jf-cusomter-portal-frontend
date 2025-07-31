import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input,
  Output,
  EventEmitter,
  TemplateRef
} from '@angular/core';
import { CustomMultiselectFacade } from './custom-multiselect.facade';
import {
  Actions,
  Boxed,
  FormControlState,
  FormControlValueTypes,
  NgrxDefaultViewAdapter,
  NGRX_FORM_VIEW_ADAPTER
} from 'ngrx-forms';
import { Observable, Subject } from 'rxjs';
import { ComponentStore } from '@ngrx/component-store';
import { SpinnerDiameter } from '@shared/loading-spinner';
import { CustomSelectOption } from '@shared/custom-select';
import { ValidationMessages } from '@shared/validation-errors';

@Component({
  selector: 'custom-multiselect',
  templateUrl: 'custom-multiselect.html',
  styleUrls: ['custom-multiselect.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    CustomMultiselectFacade,
    ComponentStore,
    {
      provide: NGRX_FORM_VIEW_ADAPTER,
      useExisting: forwardRef(() => NgrxDefaultViewAdapter),
      multi: true
    }
  ],
  standalone: false
})
export class CustomMultiselectComponent<T extends FormControlValueTypes> {
  @Input()
  public set controlState(value: FormControlState<Boxed<Array<T>>>) {
    this.facade.setControlState(value);
  }
  @Input()
  public set options(value: Array<CustomSelectOption<T>>) {
    this.facade.setOptions(value || []);
  }
  @Input() validationMessages: ValidationMessages;
  @Input() placeholder: string;
  @Input() hasTriggerIcon: boolean;
  @Input() isLoading: boolean;
  @Input() hasScroll: boolean;
  @Input() hasNextItems: boolean;
  @Input() isManuallyDisabled: boolean;
  @Input() isPermanentlyShowPlaceholder: boolean;
  @Input() position: 'left' | 'right';
  @Input() triggerTemplate: TemplateRef<any>;
  @Input() optionTemplate: TemplateRef<any>;
  @Input() notFoundTemplate: TemplateRef<any>;

  @Output() controlStateActionTriggered: Subject<Actions<any>>;
  @Output() filterChanged: Subject<string>;
  @Output() loadNextPage: EventEmitter<void>;
  @Output() triggerFirstClick: EventEmitter<void>;

  public controlState$: Observable<FormControlState<Boxed<Array<T>>>>;
  public options$: Observable<Array<CustomSelectOption<T>>>;
  public isDisabled$: Observable<boolean>;
  public getIsSelected$: (id: T) => Observable<boolean>;
  public spinnerDiameter: typeof SpinnerDiameter;

  constructor(protected facade: CustomMultiselectFacade<T>) {
    this.placeholder = '';
    this.hasTriggerIcon = true;
    this.position = 'left';
    this.controlState$ = this.facade.controlState$;
    this.options$ = this.facade.options$;
    this.isDisabled$ = this.facade.isDisabled$;
    this.getIsSelected$ = this.facade.getIsSelected$;
    this.spinnerDiameter = SpinnerDiameter;
    this.loadNextPage = new EventEmitter();
    this.controlStateActionTriggered = this.facade.controlStateActionTriggered;
    this.filterChanged = this.facade.filterChanged;
  }

  public optionClicked(option: CustomSelectOption<T>): void {
    this.facade.changeOption(option.id);
  }

  public scrolled(): void {
    if (this.hasScroll) {
      this.loadNextPage.emit();
    }
  }
}
