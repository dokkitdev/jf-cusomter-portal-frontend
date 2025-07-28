import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { KeyValue } from '@angular/common';
import { ValidationMessages } from './models';

@Component({
    selector: 'validation-errors',
    templateUrl: 'validation-errors.html',
    styleUrls: ['validation-errors.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ValidationErrorsComponent {
  @Input() messages: ValidationMessages;
  @Input() controlErrors: ValidationErrors;
  @Input() orderFunction: (a: KeyValue<string, string>, b: KeyValue<string, string>) => number;

  constructor() {
    this.orderFunction = () => 0;
  }

  public hasMessage(key: string): boolean {
    return !!this.messages?.[key];
  }
}
