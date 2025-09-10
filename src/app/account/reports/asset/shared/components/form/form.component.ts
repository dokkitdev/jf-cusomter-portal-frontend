import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { Actions, FormGroupState } from 'ngrx-forms';
import { Observable } from 'rxjs';
import { AccountReportsAssetPageFacade } from '@app/account/reports/asset/asset.facade';
import { AssetReportFormFilters } from '@app/account/reports/asset/asset.state';
import { CustomSelectOption } from '@shared/custom-select/models/select-option';

@Component({
  selector: 'account-reports-asset-form',
  templateUrl: 'form.html',
  styleUrls: ['form.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class AccountReportsAssetFormComponent implements OnInit, OnDestroy {
  public isSendingRequest$: Observable<boolean>;
  public formState$: Observable<FormGroupState<AssetReportFormFilters>>;
  public availableFilters$: Observable<any>;
  public siteOptions$: Observable<CustomSelectOption<number>[]>;
  public serviceLevelOptions$: Observable<CustomSelectOption<string>[]>;
  public assetTypeOptions$: Observable<CustomSelectOption<string>[]>;
  public errorTypeOptions$: Observable<CustomSelectOption<string>[]>;
  public jobStageOptions$: Observable<CustomSelectOption<string>[]>;
  private subscription: any;

  constructor(private facade: AccountReportsAssetPageFacade) {
    this.isSendingRequest$ = this.facade.isLoading$;
    this.formState$ = this.facade.formState$;
    this.availableFilters$ = this.facade.availableFilters$;
    this.siteOptions$ = this.facade.siteOptions$;
    this.serviceLevelOptions$ = this.facade.serviceLevelOptions$;
    this.assetTypeOptions$ = this.facade.assetTypeOptions$;
    this.errorTypeOptions$ = this.facade.errorTypeOptions$;
    this.jobStageOptions$ = this.facade.jobStageOptions$;
  }

  public ngOnInit(): void {
    // Subscribe to filters for any necessary side effects
    this.subscription = this.availableFilters$.subscribe((filters) => {
      // Filters are now available for use
      console.log('Filters are now available for use', filters);
    });
  }

  public ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public formSubmitted(): void {
    this.facade.generateReport();
  }

  public formActionTriggered(action: Actions<any>): void {
    this.facade.handleFormStateAction(action);
  }
}
