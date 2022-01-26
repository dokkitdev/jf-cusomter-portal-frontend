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
import { Group, GroupFilters } from '@shared/group';
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
  @Input() initialGroup: Group;
  @Input() excludeCustomerID: Array<number>;

  @Output() controlStateActionTriggered: EventEmitter<Actions<any>>;
  @Output() removeItem: EventEmitter<void>;
  @Output() selectValue: Subject<number>;

  public controlState$: Observable<FormControlState<number>>;
  public customerControlState$: Observable<FormControlState<number>>;
  public groupFilters$: Observable<GroupFilters>;

  constructor(
    private facade: AccountCustomersItemComponentFacade
  ) {
    this.removeItem = new EventEmitter();
    this.controlStateActionTriggered = new EventEmitter();
    this.selectValue = this.facade.selectValue;
    this.controlState$ = this.facade.controlState$;
    this.customerControlState$ = this.facade.customerControlState$;
    this.groupFilters$ = this.facade.groupFilters$;
  }

  public ngOnDestroy(): void {
    this.selectValue.next();
  }

  public removeClicked(): void {
    this.removeItem.emit();
  }

  public customerControlActionTriggered(action: Actions<any>): void {
    this.facade.handleCustomerControlStateAction(action);
  }

  public groupSelectInitialized(group: Group): void {
    this.facade.setCustomer(group.simproCustomerID);
  }
}
