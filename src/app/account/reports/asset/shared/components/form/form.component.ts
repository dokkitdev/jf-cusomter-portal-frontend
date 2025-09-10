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
  private subscription: any;

  constructor(private facade: AccountReportsAssetPageFacade) {
    this.isSendingRequest$ = this.facade.isLoading$;
    this.formState$ = this.facade.formState$;
    this.availableFilters$ = this.facade.availableFilters$;
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

  public getSiteOptions(siteIds: number[]): CustomSelectOption<number>[] {
    if (!siteIds || !Array.isArray(siteIds)) {
      return [];
    }
    return siteIds.map((id) => new CustomSelectOption({ id, title: id.toString() }));
  }

  public getServiceLevelOptions(serviceLevelNames: string[]): CustomSelectOption<string>[] {
    if (!serviceLevelNames || !Array.isArray(serviceLevelNames)) {
      return [];
    }
    return serviceLevelNames.map((name) => new CustomSelectOption({ id: name, title: name }));
  }

  public getAssetTypeOptions(assetTypes: string[]): CustomSelectOption<string>[] {
    if (!assetTypes || !Array.isArray(assetTypes)) {
      return [];
    }
    return assetTypes.map((type) => new CustomSelectOption({ id: type, title: type }));
  }

  public getErrorTypeOptions(errorTypes: string[]): CustomSelectOption<string>[] {
    if (!errorTypes || !Array.isArray(errorTypes)) {
      return [];
    }
    return errorTypes.map((type) => new CustomSelectOption({ id: type, title: type }));
  }

  public getJobStageOptions(jobStages: string[]): CustomSelectOption<string>[] {
    if (!jobStages || !Array.isArray(jobStages)) {
      return [];
    }
    return jobStages.map((stage) => new CustomSelectOption({ id: stage, title: stage }));
  }
}
