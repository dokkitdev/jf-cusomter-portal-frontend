import { ValidationMessages } from '@shared/validation-errors';
import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input,
  Output,
  EventEmitter,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { CustomSelectFacade } from './custom-select.facade';
import { CustomSelectOption } from './models';
import {
  Actions,
  FormControlState,
  FormControlValueTypes,
  NgrxDefaultViewAdapter,
  NGRX_FORM_VIEW_ADAPTER
} from 'ngrx-forms';
import { Observable, Subject } from 'rxjs';
import { ComponentStore } from '@ngrx/component-store';
import { SpinnerDiameter } from '@shared/loading-spinner';
import { CustomSelectFilterComponent } from './components/filter/filter.component';

@Component({
  selector: 'custom-select',
  templateUrl: 'custom-select.html',
  styleUrls: ['custom-select.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    CustomSelectFacade,
    ComponentStore,
    {
      provide: NGRX_FORM_VIEW_ADAPTER,
      useExisting: forwardRef(() => NgrxDefaultViewAdapter),
      multi: true
    }
  ]
})
export class CustomSelectComponent<T extends FormControlValueTypes> {
  @ViewChild('filter') filterElementRef: CustomSelectFilterComponent<string>;

  @Input()
  public set controlState(value: FormControlState<T>) {
    this.facade.setControlState(value);
  }
  @Input()
  public set options(value: Array<CustomSelectOption<T>>) {
    this.facade.setOptions(value || []);
  }
  @Input() validationMessages: ValidationMessages;
  @Input() placeholder: string;
  @Input() label: string;
  @Input() hasTriggerIcon: boolean;
  @Input() isLoading: boolean;
  @Input() hasScroll: boolean;
  @Input() hasNextItems: boolean;
  @Input() hasFilter: boolean;
  @Input() isManuallyDisabled: boolean;
  @Input() isPermanentlyShowPlaceholder: boolean;
  @Input() position: 'left' | 'right';
  @Input() triggerTemplate: TemplateRef<any>;
  @Input() optionTemplate: TemplateRef<any>;
  @Input() notFoundTemplate: TemplateRef<any>;

  @Output() controlStateActionTriggered: Subject<Actions<any>>;
  @Output() selectedOptionChanged: Subject<CustomSelectOption<T>>;
  @Output() filterChanged: Subject<string>;
  @Output() loadNextPage: EventEmitter<void>;
  @Output() triggerFirstClick: EventEmitter<void>;

  public controlState$: Observable<FormControlState<T>>;
  public options$: Observable<Array<CustomSelectOption<T>>>;
  public selectedOption$: Observable<CustomSelectOption<T> | undefined>;
  public isDisabled$: Observable<boolean>;
  public spinnerDiameter: typeof SpinnerDiameter;

  constructor(
    protected facade: CustomSelectFacade<T>
  ) {
    this.placeholder = '';
    this.label = '';
    this.hasTriggerIcon = true;
    this.position = 'left';
    this.controlState$ = this.facade.controlState$;
    this.options$ = this.facade.options$;
    this.selectedOption$ = this.facade.selectedOption$;
    this.isDisabled$ = this.facade.isDisabled$;
    this.spinnerDiameter = SpinnerDiameter;
    this.loadNextPage = new EventEmitter();
    this.triggerFirstClick = new EventEmitter();
    this.controlStateActionTriggered = this.facade.controlStateActionTriggered;
    this.selectedOptionChanged = this.facade.selectedOptionChanged;
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

  public triggerFirstClicked(): void {
    this.triggerFirstClick.emit();
  }

  public dropdownToggleOpened(isOpened: boolean): void {
    if (isOpened) {
      this.filterElementRef?.focusInput();
    }
  }
}
