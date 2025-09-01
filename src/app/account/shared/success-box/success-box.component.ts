import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { ButtonModule } from '@shared/button';

@Component({
  selector: 'account-success-box',
  templateUrl: 'success-box.html',
  styleUrls: ['success-box.scss'],
  imports: [
    ButtonModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountSuccessBoxComponent {
  public text = input.required<string>();
  public primaryButtonText = input.required<string>();
  public secondaryButtonText = input.required<string>();
  public primaryButtonClicked = output<void>();
  public secondaryButtonClicked = output<void>();
}
