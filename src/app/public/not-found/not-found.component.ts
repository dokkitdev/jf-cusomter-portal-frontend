import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'public-not-found-page',
  templateUrl: 'not-found.html',
  styleUrls: ['not-found.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class PublicNotFoundPageComponent {}
