import { ValidationMessages } from '@shared/validation-errors';
import { Customer } from '@shared/customer';
import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  OnDestroy,
  EventEmitter,
  forwardRef
} from '@angular/core';
import { Actions, FormControlState, NgrxDefaultViewAdapter, NGRX_FORM_VIEW_ADAPTER } from 'ngrx-forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'account-customers-item',
  templateUrl: 'item.html',
  styleUrls: ['item.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NGRX_FORM_VIEW_ADAPTER,
      useExisting: forwardRef(() => NgrxDefaultViewAdapter),
      multi: true
    }
  ]
})
export class AccountCustomersItemComponent implements OnDestroy {
  @Input() controlState: FormControlState<number>;
  @Input() groupValidationMessages: ValidationMessages;
  @Input() excludeCustomerID: Array<number>;

  @Output() controlStateActionTriggered: EventEmitter<Actions<any>>;
  @Output() removeItem: EventEmitter<void>;
  @Output() selectValue: Subject<number | undefined>;

  constructor() {
    this.removeItem = new EventEmitter();
    this.controlStateActionTriggered = new EventEmitter();
    this.selectValue = new Subject();
  }

  public ngOnDestroy(): void {
    this.selectValue.next(void 0);
  }

  public removeClicked(): void {
    this.removeItem.emit();
  }

  public customerSelected(customer: Customer): void {
    this.selectValue.next(customer.id);
  }
}
