import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SpinnerDiameter } from './enums';

@Component({
  selector: 'loading-spinner',
  templateUrl: 'loading-spinner.html',
  styleUrls: ['loading-spinner.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingSpinnerComponent {
  @Input() diameter: SpinnerDiameter = SpinnerDiameter.HUGE;
}
