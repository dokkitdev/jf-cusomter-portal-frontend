import {
  Component,
  ChangeDetectionStrategy,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  OnDestroy,
  Output
} from '@angular/core';
import { Actions, FormArrayState, NGRX_FORM_VIEW_ADAPTER, NgrxDefaultViewAdapter } from 'ngrx-forms';
import { AccountAssetServiceLevelMultiselectComponentFacade } from './asset-service-level-multiselect.facade';
import { CustomSelectOption } from '@shared/custom-select/models';
import { ComponentStore } from '@ngrx/component-store';
import { Observable } from 'rxjs';
import { ValidationMessages } from '@shared/validation-errors';

@Component({
  selector: 'account-asset-service-level-multiselect',
  templateUrl: 'asset-service-level-multiselect.html',
  styleUrls: ['asset-service-level-multiselect.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NGRX_FORM_VIEW_ADAPTER,
      useExisting: forwardRef(() => NgrxDefaultViewAdapter),
      multi: true
    },
    AccountAssetServiceLevelMultiselectComponentFacade,
    ComponentStore
  ]
})
export class AccountAssetServiceLevelMultiselectComponent implements OnInit, OnDestroy {
  @Input() controlState: FormArrayState<string>;
  @Input() validationMessages: ValidationMessages;
  @Input() isPermanentlyShowPlaceholder: boolean;
  @Input() placeholder: string;

  @Output() controlStateActionTriggered: EventEmitter<Actions<any>>;

  public options$: Observable<Array<CustomSelectOption<string>>>;
  public isLoading$: Observable<boolean>;

  constructor(
    private facade: AccountAssetServiceLevelMultiselectComponentFacade
  ) {
    this.controlStateActionTriggered = new EventEmitter<Actions<any>>();
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
