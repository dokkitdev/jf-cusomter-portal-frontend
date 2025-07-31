import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-public-root',
  templateUrl: 'public.html',
  styleUrls: ['public.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class PublicComponent {}
