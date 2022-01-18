import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'public-layout',
  templateUrl: 'layout.html',
  styleUrls: ['layout.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PublicLayoutComponent {
  @Input() title: string;
  @Input() page: string;
}
