import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { configuration } from '@configurations';
import { Asset } from '@shared/asset';

@Component({
  selector: 'account-assets-view-info',
  templateUrl: 'info.html',
  styleUrls: ['info.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountAssetsViewInfoComponent {
  @Input() asset: Asset;

  public dateFormat: string;

  constructor() {
    this.dateFormat = configuration.dateFormats.assetDate;
  }
}
