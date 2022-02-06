import {
  Component,
  ChangeDetectionStrategy,
  EventEmitter,
  forwardRef,
  Input,
  Output
} from '@angular/core';
import { Actions, FormControlState, NGRX_FORM_VIEW_ADAPTER, NgrxDefaultViewAdapter } from 'ngrx-forms';
import { ExistenceSelectComponentFacade } from './existence-select.facade';
import { CustomSelectOption } from '@shared/custom-select';
import { ComponentStore } from '@ngrx/component-store';
import { Observable } from 'rxjs';

@Component({
  selector: 'existence-select',
  templateUrl: 'existence-select.html',
  styleUrls: ['existence-select.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NGRX_FORM_VIEW_ADAPTER,
      useExisting: forwardRef(() => NgrxDefaultViewAdapter),
      multi: true
    },
    ExistenceSelectComponentFacade,
    ComponentStore
  ]
})
export class ExistenceSelectComponent {
  @Input() controlState: FormControlState<number>;
  @Input() placeholder: string;
  @Input() isPermanentlyShowPlaceholder: boolean;
  @Input()
  public set positiveTitle(value: string) {
    this.facade.setPositiveTitle(value);
  }
  @Input()
  public set negativeTitle(value: string) {
    this.facade.setNegativeTitle(value);
  }

  @Output() controlStateActionTriggered: EventEmitter<Actions<any>>;

  public options$: Observable<Array<CustomSelectOption<boolean>>>;

  constructor(
    private facade: ExistenceSelectComponentFacade
  ) {
    this.controlStateActionTriggered = new EventEmitter<Actions<any>>();
    this.options$ = this.facade.options$;
  }
}
