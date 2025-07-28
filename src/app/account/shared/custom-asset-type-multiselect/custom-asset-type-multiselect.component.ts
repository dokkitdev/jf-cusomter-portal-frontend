import { Subject, Observable } from 'rxjs';
import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, forwardRef, Input, Output } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { ValidationMessages } from '@shared/validation-errors';
import { Actions, Boxed, FormControlState, NgrxDefaultViewAdapter, NGRX_FORM_VIEW_ADAPTER } from 'ngrx-forms';
import { AccountCustomAssetTypeMultiselectComponentFacade } from './custom-asset-type-multiselect.facade';
import { CustomSelectOption } from '@shared/custom-select';

@Component({
    selector: 'account-custom-asset-type-multiselect',
    templateUrl: 'custom-asset-type-multiselect.html',
    styleUrls: ['custom-asset-type-multiselect.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NGRX_FORM_VIEW_ADAPTER,
            useExisting: forwardRef(() => NgrxDefaultViewAdapter),
            multi: true
        },
        AccountCustomAssetTypeMultiselectComponentFacade,
        ComponentStore
    ],
    standalone: false
})
export class AccountCustomAssetTypeMultiselectComponent implements OnInit, OnDestroy {
  @Input() controlState: FormControlState<Boxed<Array<string>>>;
  @Input() validationMessages: ValidationMessages;
  @Input() placeholder: string;

  @Output() controlStateActionTriggered: Subject<Actions<any>>;

  public options$: Observable<Array<CustomSelectOption<string>>>;
  public isLoading$: Observable<boolean>;

  constructor(
    private facade: AccountCustomAssetTypeMultiselectComponentFacade
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
