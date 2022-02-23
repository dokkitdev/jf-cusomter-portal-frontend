import { AccountCP12StatusSelectComponentFacade } from './cp12-status-select.facade';
import { Component, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Actions, Boxed, FormControlState } from 'ngrx-forms';
import { ValidationMessages } from '@shared/validation-errors';
import { CustomSelectOption } from '@shared/custom-select';

@Component({
  selector: 'account-cp12-status-select',
  templateUrl: 'cp12-status-select.html',
  styleUrls: ['cp12-status-select.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    AccountCP12StatusSelectComponentFacade,
    ComponentStore
  ]
})
export class AccountCp12StatusSelectComponent {
  @Input() controlState: FormControlState<Boxed<Array<string>>>;
  @Input() isPermanentlyShowPlaceholder: boolean;
  @Input() placeholder: string;

  @Output() controlStateActionTriggered: EventEmitter<Actions<any>>;

  public options: Array<CustomSelectOption<string>>;

  constructor(
    private facade: AccountCP12StatusSelectComponentFacade
  ) {
    this.controlStateActionTriggered = new EventEmitter<Actions<any>>();
    this.options = this.facade.options;
  }
}
