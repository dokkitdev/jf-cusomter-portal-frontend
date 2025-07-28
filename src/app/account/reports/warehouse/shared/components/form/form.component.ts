import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Actions, FormGroupState } from 'ngrx-forms';
import { Observable } from 'rxjs';
import { AccountReportsWarehousePageFacade } from '@app/account/reports/warehouse/warehouse.facade';
import { AccountReportsWarehousePageForm } from '@app/account/reports/warehouse/shared/forms';

@Component({
    selector: 'account-reports-warehouse-form',
    templateUrl: 'form.html',
    styleUrls: ['form.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class AccountReportsWarehouseFormComponent {
  public isSendingRequest$: Observable<boolean>;
  public formState$: Observable<FormGroupState<AccountReportsWarehousePageForm>>;

  constructor(
    private facade: AccountReportsWarehousePageFacade
  ) {
    this.isSendingRequest$ = this.facade.isSendingRequest$;
    this.formState$ = this.facade.formState$;
  }

  public formSubmitted(): void {
    this.facade.generateReport();
  }

  public formActionTriggered(action: Actions<any>): void {
    this.facade.handleFormStateAction(action);
  }
}
