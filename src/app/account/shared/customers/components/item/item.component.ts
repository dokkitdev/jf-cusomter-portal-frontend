import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  OnDestroy,
  EventEmitter,
  forwardRef
} from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Actions, FormControlState, NgrxDefaultViewAdapter, NGRX_FORM_VIEW_ADAPTER } from 'ngrx-forms';
import { Observable, Subject } from 'rxjs';
import { AccountCustomersItemComponentFacade } from './item.facade';

@Component({
  selector: 'account-customers-item',
  templateUrl: 'item.html',
  styleUrls: ['item.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    AccountCustomersItemComponentFacade,
    ComponentStore,
    {
      provide: NGRX_FORM_VIEW_ADAPTER,
      useExisting: forwardRef(() => NgrxDefaultViewAdapter),
      multi: true
    }
  ]
})
export class AccountCustomersItemComponent implements OnDestroy {
  @Input()
  public set controlState(value: FormControlState<number>) {
    this.facade.setControlState(value);
  }
  @Input() groupValidationMessages: Map<string, string>;
  @Input() excludeCustomerID: Array<number>;

  @Output() controlStateActionTriggered: EventEmitter<Actions<any>>;
  @Output() removeItem: EventEmitter<void>;
  @Output() selectValue: Subject<number | undefined>;

  public controlState$: Observable<FormControlState<number>>;
  public customerControlState$: Observable<FormControlState<number>>;

  constructor(
    private facade: AccountCustomersItemComponentFacade
  ) {
    this.removeItem = new EventEmitter();
    this.controlStateActionTriggered = new EventEmitter();
    this.selectValue = this.facade.selectValue;
    this.controlState$ = this.facade.controlState$;
    this.customerControlState$ = this.facade.customerControlState$;
  }

  public ngOnDestroy(): void {
    this.selectValue.next(void 0);
  }

  public removeClicked(): void {
    this.removeItem.emit();
  }

  public customerControlActionTriggered(action: Actions<any>): void {
    this.facade.handleCustomerControlStateAction(action);
  }
}
