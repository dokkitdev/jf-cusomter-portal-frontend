import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { configuration } from '@configurations';
import { AssetCustomField } from '@shared/asset';

@Component({
  selector: 'account-assets-view-custom-fields',
  templateUrl: 'custom-fields.html',
  styleUrls: ['custom-fields.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class AccountAssetsViewCustomFieldsComponent {
  @Input() items: Array<AssetCustomField>;
  @Input() countOfDisplayedCustomFields: number;

  constructor() {
    this.countOfDisplayedCustomFields = configuration.assetDetails.countOfDisplayedCustomFields;
  }
}
