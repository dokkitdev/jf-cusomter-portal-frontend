import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Actions, FormGroupState } from 'ngrx-forms';
import { Observable } from 'rxjs';
import { AccountReportsAssetPageFacade } from '@app/account/reports/asset/asset.facade';
import { AssetReportFilters } from '@app/account/reports/asset/asset.state';

@Component({
  selector: 'account-reports-asset-form',
  templateUrl: 'form.html',
  styleUrls: ['form.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class AccountReportsAssetFormComponent {
  public isSendingRequest$: Observable<boolean>;
  public formState$: Observable<FormGroupState<AssetReportFilters>>;

  // Mock data for dropdowns
  public sites = [
    { id: '25107', name: '25107' },
    { id: '21693', name: '21693 Archived' }
  ];

  public serviceLevels = ['5 Year Test and Inspection', 'Annual', 'Monthly', 'Quarterly'];

  public assetTypes = [
    'Alarms - CO',
    'Cat 3 Water Risk Assessment',
    'Electric - Consumer Unit/Distribution System',
    'Heating System - Wet',
    'Heating Controls and Accessories',
    'Pipework',
    'Gas - Consumer Unit/Distribution System',
    'Water - Consumer Unit/Distribution System'
  ];

  public errors = [
    'Tag',
    'Lorem ipsum very long text on this filter to test the field behavior',
    'Service complete outside of due date',
    'Last service over 14mths',
    'No UPRN'
  ];

  public stages = ['Last Service over 14mths', 'No UPRN', 'Service Due', 'Overdue'];

  constructor(private facade: AccountReportsAssetPageFacade) {
    this.isSendingRequest$ = this.facade.isLoading$;
    this.formState$ = this.facade.formState$;
  }

  public formSubmitted(): void {
    this.facade.generateReport();
  }

  public formActionTriggered(action: Actions<any>): void {
    this.facade.handleFormStateAction(action);
  }
}
