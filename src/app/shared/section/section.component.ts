import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'section',
    templateUrl: 'section.html',
    styleUrls: ['section.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class SectionComponent {
  @Input() name: string;
  @Input() isNoContent: boolean;
}
