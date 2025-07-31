import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef
} from '@angular/core';
import {
  Actions,
  FormControlState,
  FormControlValueTypes,
  NgrxDefaultViewAdapter,
  NGRX_FORM_VIEW_ADAPTER
} from 'ngrx-forms';

@Component({
  selector: 'filter-select-text',
  templateUrl: 'filter-select-text.html',
  styleUrls: ['filter-select-text.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NGRX_FORM_VIEW_ADAPTER,
      useExisting: forwardRef(() => NgrxDefaultViewAdapter),
      multi: true
    }
  ],
  standalone: false
})
export class FilterSelectTextComponent<T extends FormControlValueTypes> {
  @ViewChild('control') controlElementRef: ElementRef;
  @ViewChild('trigger') triggerElementRef: ElementRef;

  @Input() controlState: FormControlState<T>;
  @Input() name: string;
  @Input() position: 'left' | 'right';
  @Input() type: string;
  @Input() min: number;

  @Output() controlStateActionTriggered: EventEmitter<Actions<any>>;

  constructor() {
    this.name = '';
    this.position = 'left';
    this.type = 'text';
    this.controlStateActionTriggered = new EventEmitter();
  }

  public dropdownToggleOpened(opened: boolean): void {
    if (opened) {
      this.controlElementRef.nativeElement.focus();
    } else {
      this.controlElementRef.nativeElement.blur();
    }
  }

  public dropdownClosed(): void {
    this.triggerElementRef.nativeElement.click();
  }
}
