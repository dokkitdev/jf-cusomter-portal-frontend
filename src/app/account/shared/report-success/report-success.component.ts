import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-report-success',
  templateUrl: 'report-success.html',
  styleUrls: ['report-success.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class ReportSuccessComponent {
  @Input() generateNewButtonKey!: string;

  @Output() generateNewClicked = new EventEmitter<void>();
  @Output() goToReportsClicked = new EventEmitter<void>();

  public onGenerateNewClicked(): void {
    this.generateNewClicked.emit();
  }

  public onGoToReportsClicked(): void {
    this.goToReportsClicked.emit();
  }
}
