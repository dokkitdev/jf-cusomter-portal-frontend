import { Observable } from 'rxjs';
import { Actions, FormControlState, NgrxDefaultViewAdapter, NGRX_FORM_VIEW_ADAPTER } from 'ngrx-forms';
import { Component, ChangeDetectionStrategy, forwardRef, OnInit, OnDestroy, Input, EventEmitter, Output } from '@angular/core';
import { AccountCustomAssetTypeSelectFacade } from './custom-asset-type-select.facade';
import { ComponentStore } from '@ngrx/component-store';
import { CustomAssetType } from '@shared/asset';
import { ValidationMessages } from '@shared/validation-errors';
import { CustomSelectOption } from '@shared/custom-select';

@Component({
  selector: 'account-custom-asset-type-select',
  templateUrl: 'custom-asset-type-select.html',
  styleUrls: ['custom-asset-type-select.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NGRX_FORM_VIEW_ADAPTER,
      useExisting: forwardRef(() => NgrxDefaultViewAdapter),
      multi: true
    },
    AccountCustomAssetTypeSelectFacade,
    ComponentStore
  ]
})
export class AccountCustomAssetTypeSelectComponent implements OnInit, OnDestroy {
  @Input()
  public set controlState(value: FormControlState<number>) {
    this.facade.setControlState(value);
  }
  @Input() initialAssetType: CustomAssetType;
  @Input() validationMessages: ValidationMessages;
  @Input() isPermanentlyShowPlaceholder: boolean;
  @Input() placeholder: string;

  @Output() controlStateActionTriggered: EventEmitter<Actions<any>>;
  @Output() selectedAssetTypeChanged: EventEmitter<CustomAssetType>;

  public controlState$: Observable<FormControlState<number>>;
  public options$: Observable<Array<CustomSelectOption<number>>>;
  public isLoading$: Observable<boolean>;

  constructor(
    private facade: AccountCustomAssetTypeSelectFacade
  ) {
    this.controlStateActionTriggered = new EventEmitter<Actions<any>>();
    this.selectedAssetTypeChanged = new EventEmitter<CustomAssetType>();
    this.controlState$ = this.facade.controlState$;
    this.options$ = this.facade.options$;
    this.isLoading$ = this.facade.isLoading$;
  }

  public ngOnInit(): void {
    if (this.initialAssetType) {
      this.facade.setInitialItem(this.initialAssetType);
    }

    this.facade.loadItemsByParameters();
  }

  public ngOnDestroy(): void {
    this.facade.resetState();
  }

  public selectedOptionChanged(option: CustomSelectOption<number, CustomAssetType>): void {
    this.selectedAssetTypeChanged.emit(option?.data);
  }
}
