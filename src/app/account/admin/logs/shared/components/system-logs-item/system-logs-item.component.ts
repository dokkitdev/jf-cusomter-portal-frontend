import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { SystemLog } from '@shared/notify';
import { configuration } from '@configurations';

@Component({
  selector: 'admin-logs-system-logs-item',
  templateUrl: 'system-logs-item.html',
  styleUrls: ['system-logs-item.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class AccountAdminLogsSystemLogsItemComponent {
  @Input() item: SystemLog;
  @Output() openLettersClicked = new EventEmitter<SystemLog>();

  public get dateTimeFormat(): string {
    return configuration.dateFormats.reports.logsDateTime;
  }

  public onOpenLettersClicked(systemLog: SystemLog): void {
    this.openLettersClicked.emit(systemLog);
  }
}
