import { ChangeDetectionStrategy, Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'custom-multiselect-trigger',
  templateUrl: 'trigger.html',
  styleUrls: ['trigger.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class CustomMultiselectTriggerComponent {
  @Input() customTemplate: TemplateRef<any>;
  @Input() placeholder: string;
  @Input() hasTriggerIcon: boolean;
}
