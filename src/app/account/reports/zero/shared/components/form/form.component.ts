import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Actions, FormGroupState } from 'ngrx-forms';
import { Observable } from 'rxjs';
import { AccountReportsZeroPageFacade } from '@app/account/reports/zero/zero.facade';
import { AccountReportsZeroPageForm } from '../../forms';

@Component({
  selector: 'account-reports-zero-form',
  templateUrl: 'form.html',
  styleUrls: ['form.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class AccountReportsZeroFormComponent {
  public isSendingRequest$: Observable<boolean>;
  public formState$: Observable<FormGroupState<AccountReportsZeroPageForm>>;

  constructor(private facade: AccountReportsZeroPageFacade) {
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
