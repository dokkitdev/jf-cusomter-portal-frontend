import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ParsingLog } from '@shared/notify';
import { configuration } from '@configurations';

export interface ParsingLogsDialogData {
  parsingLog: ParsingLog;
}

@Component({
  selector: 'admin-logs-parsing-logs-dialog',
  templateUrl: 'parsing-logs-dialog.html',
  styleUrls: ['parsing-logs-dialog.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class AdminLogsParsingLogsDialogComponent {
  public get dateFormat(): string {
    return configuration.dateFormats.documentDate;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ParsingLogsDialogData,
    private dialogRef: MatDialogRef<AdminLogsParsingLogsDialogComponent>
  ) {}

  public get parsingLog(): ParsingLog {
    return this.data.parsingLog;
  }

  public onClose(): void {
    this.dialogRef.close();
  }
}
