import { SpinnerDiameter } from '@shared/loading-spinner';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'table-container',
  templateUrl: 'table-container.html',
  styleUrls: ['table-container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class TableContainerComponent {
  @Input() isLoading: boolean;
  @Input() itemsCount: number;

  public get hasItems(): boolean {
    return !this.isLoading && !!this.itemsCount;
  }

  public get isNotFound(): boolean {
    return !this.isLoading && !this.itemsCount;
  }

  public spinnerDiameter: typeof SpinnerDiameter;

  constructor() {
    this.spinnerDiameter = SpinnerDiameter;
  }
}
