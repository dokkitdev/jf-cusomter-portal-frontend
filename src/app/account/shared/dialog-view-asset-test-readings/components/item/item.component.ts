import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { AssetReading } from '@shared/asset';

@Component({
  selector: 'dialog-view-asset-test-readings-item',
  templateUrl: 'item.html',
  styleUrls: ['item.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class AccountDialogViewAssetTestReadingsItemComponent {
  @Input() item: AssetReading;
}
