import { Observable } from 'rxjs';
import { AccountReportsServiceControlFacade } from './../../../service-control.facade';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Asset } from '@shared/asset';

@Component({
  selector: 'reports-service-control-items',
  templateUrl: 'items.html',
  styleUrls: ['items.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountReportsServiceControlItemsComponent {
  public isLoading$: Observable<boolean>;
  public items$: Observable<Array<Asset>>;
  public paginationId$: Observable<string>;

  constructor(
    private facade: AccountReportsServiceControlFacade
  ) {
    this.isLoading$ = this.facade.isLoading$;
    this.items$ = this.facade.items$;
    this.paginationId$ = this.facade.paginationId$;
  }
}
