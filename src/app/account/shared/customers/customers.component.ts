import { ValidationMessages } from '@shared/validation-errors';
import { ChangeDetectionStrategy, Component, forwardRef, Input, Output, OnDestroy } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable, Subject } from 'rxjs';
import { AccountCustomersComponentFacade } from './customers.facade';
import { heightCollapseAnimation } from '@shared/animations';
import { Actions, FormArrayState, NgrxDefaultViewAdapter, NGRX_FORM_VIEW_ADAPTER } from 'ngrx-forms';

@Component({
  selector: 'account-customers',
  templateUrl: 'customers.html',
  styleUrls: ['customers.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    AccountCustomersComponentFacade,
    ComponentStore,
    {
      provide: NGRX_FORM_VIEW_ADAPTER,
      useExisting: forwardRef(() => NgrxDefaultViewAdapter),
      multi: true
    }
  ],
  animations: [heightCollapseAnimation],
  standalone: false
})
export class AccountCustomersComponent implements OnDestroy {
  @Input()
  public set controlState(value: FormArrayState<number>) {
    this.facade.setControlState(value);
  }
  @Input() groupValidationMessages: ValidationMessages;

  @Output() controlStateActionTriggered: Subject<Actions<any>>;

  public controlState$: Observable<FormArrayState<number>>;
  public excludeCustomerID$: Observable<Array<number>>;

  constructor(private facade: AccountCustomersComponentFacade) {
    this.controlStateActionTriggered = this.facade.controlStateActionTriggered;
    this.controlState$ = this.facade.controlState$;
    this.excludeCustomerID$ = this.facade.excludeCustomerID$;
  }

  public ngOnDestroy(): void {
    this.facade.resetState();
  }

  public addNewItemClicked(): void {
    this.facade.addNewItem();
  }

  public removeItemClicked(index: number): void {
    this.facade.removeItem(index);
  }

  public valueSelected(id: number, index: number): void {
    this.facade.setExcludeCustomerID(id, index);
  }
}
