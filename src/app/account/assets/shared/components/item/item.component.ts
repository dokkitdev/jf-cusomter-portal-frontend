import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { configuration } from '@configurations';
import { Asset } from '@shared/asset';

@Component({
  selector: 'assets-item',
  templateUrl: 'item.html',
  styleUrls: ['item.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class AccountAssetsItemComponent {
  @Input() item: Asset;

  public dateFormat: string;

  constructor() {
    this.dateFormat = configuration.dateFormats.assetDate;
  }
}
