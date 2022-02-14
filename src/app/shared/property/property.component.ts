import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'property',
  templateUrl: 'property.html',
  styleUrls: ['property.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PropertyComponent { }
