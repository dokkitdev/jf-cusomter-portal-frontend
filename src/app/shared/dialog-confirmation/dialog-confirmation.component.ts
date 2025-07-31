import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogConfirmationConfig } from './models';

@Component({
  selector: 'dialog-confirmation',
  templateUrl: 'dialog-confirmation.html',
  styleUrls: ['dialog-confirmation.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class DialogConfirmationComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogConfirmationConfig,
    private readonly dialogRef: MatDialogRef<DialogConfirmationComponent>
  ) {}

  public closeButtonClicked(): void {
    this.dialogRef.close();
  }

  public confirmButtonClicked(): void {
    if (this.data.resultData === undefined) {
      this.dialogRef.close(true);
    } else {
      this.dialogRef.close(this.data.resultData);
    }
  }
}
