import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { configuration } from '@configurations';
import { AssetTest } from '@shared/asset';
import { AccountAssetTestsComponentFacade } from '../../asset-tests.facade';

@Component({
    selector: 'asset-tests-item',
    templateUrl: 'item.html',
    styleUrls: ['item.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class AccountAssetTestsItemComponent {
  @Input() item: AssetTest;

  public get notes(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.item.notes || '');
  }

  public dateFormat: string;

  constructor(
    private facade: AccountAssetTestsComponentFacade,
    private sanitizer: DomSanitizer
  ) {
    this.dateFormat = configuration.dateFormats.assetDate;
  }

  public viewReadingsClicked(): void {
    this.facade.openViewReadingsDialog(this.item);
  }
}
