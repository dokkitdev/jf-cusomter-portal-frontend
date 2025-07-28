import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'form-group',
    templateUrl: 'form-group.html',
    styleUrls: ['form-group.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class FormGroupComponent {
  @Input() label: string;
}
