import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { ParsingLog } from '@shared/notify';
import { configuration } from '@configurations';

@Component({
  selector: 'admin-logs-parsing-logs-item',
  templateUrl: 'parsing-logs-item.html',
  styleUrls: ['parsing-logs-item.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class AccountAdminLogsParsingLogsItemComponent {
  @Input() item: ParsingLog;
  @Output() showClicked = new EventEmitter<ParsingLog>();

  public get dateFormat(): string {
    return configuration.dateFormats.documentDate;
  }

  public onShowClicked(parsingLog: ParsingLog): void {
    this.showClicked.emit(parsingLog);
  }
}
