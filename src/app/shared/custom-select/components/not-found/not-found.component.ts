import { ChangeDetectionStrategy, Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'custom-select-not-found',
  templateUrl: 'not-found.html',
  styleUrls: ['not-found.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomSelectNotFoundComponent {
  @Input() customTemplate: TemplateRef<any>;
}
