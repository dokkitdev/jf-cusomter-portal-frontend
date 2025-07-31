import { Component, ChangeDetectionStrategy, forwardRef, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { Actions, FormControlState, NGRX_FORM_VIEW_ADAPTER, NgrxDefaultViewAdapter, Boxed } from 'ngrx-forms';
import { AccountJobStatusMultiselectComponentFacade } from './job-status-multiselect.facade';
import { CustomSelectOption } from '@shared/custom-select/models';
import { Observable, Subject } from 'rxjs';
import { ComponentStore } from '@ngrx/component-store';
import { ValidationMessages } from '@shared/validation-errors';

@Component({
  selector: 'account-job-status-multiselect',
  templateUrl: 'job-status-multiselect.html',
  styleUrls: ['job-status-multiselect.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NGRX_FORM_VIEW_ADAPTER,
      useExisting: forwardRef(() => NgrxDefaultViewAdapter),
      multi: true
    },
    AccountJobStatusMultiselectComponentFacade,
    ComponentStore
  ],
  standalone: false
})
export class AccountJobStatusMultiselectComponent implements OnInit, OnDestroy {
  @Input() controlState: FormControlState<Boxed<Array<string>>>;
  @Input() validationMessages: ValidationMessages;
  @Input() placeholder: string;

  @Output() controlStateActionTriggered: Subject<Actions<any>>;

  public options$: Observable<Array<CustomSelectOption<string>>>;
  public isLoading$: Observable<boolean>;

  constructor(private facade: AccountJobStatusMultiselectComponentFacade) {
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
