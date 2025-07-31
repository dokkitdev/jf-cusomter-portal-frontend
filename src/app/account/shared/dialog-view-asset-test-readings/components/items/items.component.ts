import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { heightCollapseAnimation } from '@shared/animations';
import { AssetReading } from '@shared/asset';

@Component({
  selector: 'dialog-view-asset-test-readings-items',
  templateUrl: 'items.html',
  styleUrls: ['items.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [heightCollapseAnimation],
  standalone: false
})
export class AccountDialogViewAssetTestReadingsItemsComponent {
  @Input() items: Array<AssetReading>;
}
