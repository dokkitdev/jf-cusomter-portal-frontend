import { ChangeDetectionStrategy, Component, forwardRef, Input, Output, EventEmitter } from '@angular/core';
import { Actions, FormControlState, NgrxDefaultViewAdapter, NgrxValueConverter, NGRX_FORM_VIEW_ADAPTER } from 'ngrx-forms';
import { dateValueConverter } from '@shared/date-converter';
import { Observable } from 'rxjs';
import { FormDatepickerFacade } from './form-datepicker.facade';
import { ComponentStore } from '@ngrx/component-store';

@Component({
  selector: 'form-datepicker',
  templateUrl: 'form-datepicker.html',
  styleUrls: ['form-datepicker.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NGRX_FORM_VIEW_ADAPTER,
      useExisting: forwardRef(() => NgrxDefaultViewAdapter),
      multi: true
    },
    FormDatepickerFacade,
    ComponentStore
  ]
})
export class FormDatepickerComponent {
  @Input() controlState: FormControlState<string>;
  @Input() placeholder: string;
  @Input() isDisabled: boolean;
  @Input() validationMessages: Map<string, string>;
  @Input() dataTestID: string;
  @Input() dateFilter: (date: Date) => boolean;
  @Input() dateValueConverter: NgrxValueConverter<Date | null, string | null> = dateValueConverter;

  @Output() controlStateActionTriggered: EventEmitter<Actions<string>>;

  public isOpened$: Observable<boolean>;

  constructor(
    private facade: FormDatepickerFacade
  ) {
    this.controlStateActionTriggered = new EventEmitter<Actions<string>>();
    this.isOpened$ = this.facade.isOpened$;
  }

  public datePickerOpened(): void {
    this.facade.open();
  }

  public datePickerClosed(): void {
    this.facade.close();
  }
}
