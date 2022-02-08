import {
  Component,
  ChangeDetectionStrategy,
  forwardRef,
  Input,
  Output,
  OnInit,
  OnDestroy
} from '@angular/core';
import { Actions, FormControlState, NGRX_FORM_VIEW_ADAPTER, NgrxDefaultViewAdapter, Boxed } from 'ngrx-forms';
import { AccountCostCenterMultiselectComponentFacade } from './cost-center-multiselect.facade';
import { CustomSelectOption } from '@shared/custom-select/models';
import { Observable, Subject } from 'rxjs';
import { ComponentStore } from '@ngrx/component-store';
import { ValidationMessages } from '@shared/validation-errors';

@Component({
  selector: 'account-cost-center-multiselect',
  templateUrl: 'cost-center-multiselect.html',
  styleUrls: ['cost-center-multiselect.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NGRX_FORM_VIEW_ADAPTER,
      useExisting: forwardRef(() => NgrxDefaultViewAdapter),
      multi: true
    },
    AccountCostCenterMultiselectComponentFacade,
    ComponentStore
  ]
})
export class AccountCostCenterMultiselectComponent implements OnInit, OnDestroy {
  @Input() controlState: FormControlState<Boxed<Array<string>>>;
  @Input() validationMessages: ValidationMessages;
  @Input() placeholder: string;

  @Output() controlStateActionTriggered: Subject<Actions<any>>;

  public options$: Observable<Array<CustomSelectOption<string>>>;
  public isLoading$: Observable<boolean>;

  constructor(
    private facade: AccountCostCenterMultiselectComponentFacade
  ) {
    this.controlStateActionTriggered = this.facade.controlStateActionTriggered;
    this.options$ = this.facade.options$;
    this.isLoading$ = this.facade.isLoading$;
  }

  public ngOnInit(): void {
    this.facade.loadItems();
  }

  public ngOnDestroy(): void {
    this.facade.resetState();
  }
}
