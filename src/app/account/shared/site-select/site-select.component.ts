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
import { AccountSiteSelectComponentFacade } from './site-select.facade';
import { CustomSelectOption } from '@shared/custom-select/models';
import { Site } from '@shared/site';
import { Observable } from 'rxjs';
import { ComponentStore } from '@ngrx/component-store';
import { SiteIDField } from './types';
import { ValidationMessages } from '@shared/validation-errors';

@Component({
  selector: 'account-site-select',
  templateUrl: 'site-select.html',
  styleUrls: ['site-select.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NGRX_FORM_VIEW_ADAPTER,
      useExisting: forwardRef(() => NgrxDefaultViewAdapter),
      multi: true
    },
    AccountSiteSelectComponentFacade,
    ComponentStore
  ],
  standalone: false
})
export class AccountSiteSelectComponent implements OnInit, OnDestroy {
  @Input()
  public set controlState(value: FormControlState<number>) {
    this.facade.setControlState(value);
  }
  @Input()
  public set idField(value: SiteIDField) {
    this.facade.setIDField(value);
  }
  @Input() initialSite: Site;
  @Input() validationMessages: ValidationMessages;
  @Input() isPermanentlyShowPlaceholder: boolean;
  @Input() placeholder: string;

  @Output() controlStateActionTriggered: EventEmitter<Actions<any>>;
  @Output() selectedSiteChanged: EventEmitter<Site>;

  public controlState$: Observable<FormControlState<number>>;
  public options$: Observable<Array<CustomSelectOption<number | string>>>;
  public isLoading$: Observable<boolean>;
  public hasNextItems$: Observable<boolean>;

  constructor(private facade: AccountSiteSelectComponentFacade) {
    this.controlStateActionTriggered = new EventEmitter<Actions<any>>();
    this.selectedSiteChanged = new EventEmitter<Site>();
    this.controlState$ = this.facade.controlState$;
    this.options$ = this.facade.options$;
    this.isLoading$ = this.facade.isLoading$;
    this.hasNextItems$ = this.facade.hasNextItems$;
  }

  public ngOnInit(): void {
    if (this.initialSite) {
      this.facade.setInitialItem(this.initialSite);
    } else {
      this.facade.loadInitialItem();
    }
    this.facade.loadItemsByParameters();
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

  public selectedOptionChanged(option: CustomSelectOption<string | number, Site>): void {
    this.selectedSiteChanged.emit(option?.data);
  }
}
