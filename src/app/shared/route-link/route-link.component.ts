import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'route-link',
  templateUrl: 'route-link.html',
  styleUrls: ['route-link.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class RouteLinkComponent {
  @Input() route: string;
  @Input() title: string;
  @Input() hasIcon: boolean;
}
