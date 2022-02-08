import { ChangeDetectionStrategy, Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'custom-multiselect-not-found',
  templateUrl: 'not-found.html',
  styleUrls: ['not-found.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomMultiselectNotFoundComponent {
  @Input() customTemplate: TemplateRef<any>;
}
