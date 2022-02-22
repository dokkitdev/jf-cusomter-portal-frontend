import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonSize, ButtonType, ButtonVariant } from './types';

@Component({
  selector: 'btn',
  templateUrl: 'button.html',
  styleUrls: ['button.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
  @Input() type: ButtonType;
  @Input() variant: ButtonVariant;
  @Input() size: ButtonSize;
  @Input() isBlock?: boolean | null;
  @Input() isDisabled?: boolean | null;
  @Input() isLoading?: boolean | null;
  @Input() hasIcon?: boolean | null;

  @Output() clicked: EventEmitter<MouseEvent>;

  constructor() {
    this.type = 'button';
    this.variant = 'primary';
    this.size = 'medium';

    this.clicked = new EventEmitter();
  }

  public onClick(event: MouseEvent): void {
    this.clicked.emit(event);
  }
}
