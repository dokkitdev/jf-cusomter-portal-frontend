import { Component, ChangeDetectionStrategy, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { Actions, FormControlState, NGRX_FORM_VIEW_ADAPTER, NgrxDefaultViewAdapter } from 'ngrx-forms';
import { AccountAssetTestResultSelectComponentFacade } from './asset-test-result-select.facade';
import { CustomSelectOption } from '@shared/custom-select/models';
import { ComponentStore } from '@ngrx/component-store';
import { AssetTestResult } from '@shared/asset';
import { ValidationMessages } from '@shared/validation-errors';

@Component({
  selector: 'account-asset-test-result-select',
  templateUrl: 'asset-test-result-select.html',
  styleUrls: ['asset-test-result-select.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NGRX_FORM_VIEW_ADAPTER,
      useExisting: forwardRef(() => NgrxDefaultViewAdapter),
      multi: true
    },
    AccountAssetTestResultSelectComponentFacade,
    ComponentStore
  ],
  standalone: false
})
export class AccountAssetTestResultSelectComponent {
  @Input() controlState: FormControlState<AssetTestResult>;
  @Input() validationMessages: ValidationMessages;
  @Input() isPermanentlyShowPlaceholder: boolean;
  @Input() placeholder: string;

  @Output() controlStateActionTriggered: EventEmitter<Actions<any>>;

  public options: Array<CustomSelectOption<string>>;

  constructor(private facade: AccountAssetTestResultSelectComponentFacade) {
    this.controlStateActionTriggered = new EventEmitter<Actions<any>>();
    this.options = this.facade.options;
  }
}
