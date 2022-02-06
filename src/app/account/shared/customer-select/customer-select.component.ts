import { ValidationMessages } from '@shared/validation-errors';
import {
  Component,
  ChangeDetectionStrategy,
  EventEmitter,
  forwardRef,
  Input,
  Output,
  OnInit,
  OnDestroy
} from '@angular/core';
import { Actions, FormControlState, NGRX_FORM_VIEW_ADAPTER, NgrxDefaultViewAdapter } from 'ngrx-forms';
import { AccountCustomerSelectComponentFacade } from './customer-select.facade';
import { CustomSelectOption } from '@shared/custom-select';
import { Customer } from '@shared/customer';
import { Observable } from 'rxjs';
import { ComponentStore } from '@ngrx/component-store';

@Component({
  selector: 'account-customer-select',
  templateUrl: 'customer-select.html',
  styleUrls: ['customer-select.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NGRX_FORM_VIEW_ADAPTER,
      useExisting: forwardRef(() => NgrxDefaultViewAdapter),
      multi: true
    },
    AccountCustomerSelectComponentFacade,
    ComponentStore
  ]
})
export class AccountCustomerSelectComponent implements OnInit, OnDestroy {
  @Input()
  public set controlState(value: FormControlState<number>) {
    this.facade.setControlState(value);
  }
  @Input()
  public set excludeID(value: Array<number>) {
    this.facade.setExcludeID(value);
  }
  @Input()
  public set idField(value: keyof Customer) {
    this.facade.setIDField(value);
  }
  @Input() validationMessages: ValidationMessages;
  @Input() initialCustomer: Customer;
  @Input() isLoadByOpen: boolean;
  @Input() isPermanentlyShowPlaceholder: boolean;
  @Input() label: string;
  @Input() placeholder: string;

  @Output() controlStateActionTriggered: EventEmitter<Actions<any>>;
  @Output() selectedCustomerChanged: EventEmitter<Customer>;

  public controlState$: Observable<FormControlState<number>>;
  public options$: Observable<Array<CustomSelectOption<number | string>>>;
  public isLoading$: Observable<boolean>;
  public hasNextItems$: Observable<boolean>;

  constructor(
    private facade: AccountCustomerSelectComponentFacade
  ) {
    this.label = '';
    this.placeholder = '';
    this.controlStateActionTriggered = new EventEmitter<Actions<any>>();
    this.selectedCustomerChanged = new EventEmitter<Customer>();
    this.controlState$ = this.facade.controlState$;
    this.options$ = this.facade.options$;
    this.isLoading$ = this.facade.isLoading$;
    this.hasNextItems$ = this.facade.hasNextItems$;
  }

  public ngOnInit(): void {
    if (this.initialCustomer) {
      this.facade.setInitialItem(this.initialCustomer);
    } else {
      this.facade.loadInitialItem();
    }
    if (!this.isLoadByOpen) {
      this.facade.loadItemsByParameters();
    }
  }

  public ngOnDestroy(): void {
    this.facade.resetState();
  }

  public loadNextPageClicked(): void {
    this.facade.loadNextPage();
  }

  public filterChanged(query: string): void {
    this.facade.changeFilterQuery(query);
  }

  public triggerFirstClicked(): void {
    if (this.isLoadByOpen) {
      this.facade.loadItemsByParameters();
    }
  }

  public selectedOptionChanged(option: CustomSelectOption<string | number, Customer>): void {
    this.selectedCustomerChanged.emit(option?.data);
  }
}
