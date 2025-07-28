import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccountDialogViewAssetTestReadingsData } from './models';

@Component({
    selector: 'account-dialog-view-asset-test-readings',
    templateUrl: 'dialog-view-asset-test-readings.html',
    styleUrls: ['dialog-view-asset-test-readings.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class AccountDialogViewAssetTestReadingsComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: AccountDialogViewAssetTestReadingsData,
    private readonly dialogRef: MatDialogRef<AccountDialogViewAssetTestReadingsComponent>
  ) { }

  public cancelClicked(): void {
    this.dialogRef.close();
  }
}
