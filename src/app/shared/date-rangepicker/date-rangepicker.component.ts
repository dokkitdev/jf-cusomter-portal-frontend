import { ChangeDetectionStrategy, Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import {
  Actions,
  FormControlState,
  NGRX_FORM_VIEW_ADAPTER,
  NgrxDefaultViewAdapter,
  NgrxValueConverter, SetValueAction
} from 'ngrx-forms';
import { Observable } from 'rxjs';
import { DatepickerDropdownPositionX, DatepickerDropdownPositionY } from '@angular/material/datepicker';
import { dateValueConverter } from '@shared/date-converter';
import { DateRangepickerFacade } from './date-rangepicker.facade';

@Component({
  selector: 'date-rangepicker',
  templateUrl: 'date-rangepicker.html',
  styleUrls: ['date-rangepicker.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    DateRangepickerFacade,
    ComponentStore,
    {
      provide: NGRX_FORM_VIEW_ADAPTER,
      useExisting: forwardRef(() => NgrxDefaultViewAdapter),
      multi: true
    }
  ]
})
export class DateRangepickerComponent {
  @Input() startDateControlState: FormControlState<string>;
  @Input() endDateControlState: FormControlState<string>;
  @Input() placeholder: string;
  @Input() label: string;
  @Input() isRequired: boolean;
  @Input() isDisabled: boolean;
  @Input() xPosition: DatepickerDropdownPositionX;
  @Input() validationMessages: Record<string, string>;

  @Output() controlStateActionTriggered: EventEmitter<Actions<any>>;
  @Output() cleared: EventEmitter<void>;

  public get hasSelectedOptions(): boolean {
    return this.startDateControlState.value?.length > 0 || this.endDateControlState.value?.length > 0;
  }

  public dateValueConverter: NgrxValueConverter<Date | null, string | null>;
  public isOpened$: Observable<boolean>;
  public positionY$: Observable<DatepickerDropdownPositionY>;

  constructor(
    private facade: DateRangepickerFacade
  ) {
    this.cleared = new EventEmitter();
    this.controlStateActionTriggered = new EventEmitter<Actions<any>>();

    this.isOpened$ = this.facade.isOpened$;
    this.positionY$ = this.facade.positionY$;
    this.dateValueConverter = dateValueConverter;
  }

  public datePickerOpened(): void {
    this.facade.open();
  }

  public datePickerClosed(): void {
    this.facade.close();
  }

  public positionYChanged(positionY: DatepickerDropdownPositionY): void {
    this.facade.changePositionY(positionY);
  }

  public resetTriggered(): void {
    this.controlStateActionTriggered.emit(
      new SetValueAction(this.startDateControlState.id, undefined)
    );
    this.controlStateActionTriggered.emit(
      new SetValueAction(this.endDateControlState.id, undefined)
    );

    this.cleared.emit();
  }
}
