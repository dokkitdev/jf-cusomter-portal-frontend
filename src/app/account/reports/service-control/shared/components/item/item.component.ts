import { configuration } from '@configurations';
import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Asset } from '@shared/asset';

@Component({
  selector: 'reports-service-control-item',
  templateUrl: 'item.html',
  styleUrls: ['item.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountReportsServiceControlItemComponent {
  @Input() item: Asset;

  public readonly dateFormat: string;

  constructor() {
    this.dateFormat = configuration.dateFormats.reports.serviceControlDate;
  }
}
