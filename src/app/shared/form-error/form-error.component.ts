import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'form-error',
  templateUrl: 'form-error.html',
  styleUrls: ['form-error.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormErrorComponent {
  @Input() title: string;
}
