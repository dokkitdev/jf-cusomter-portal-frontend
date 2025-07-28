import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'property',
    templateUrl: 'property.html',
    styleUrls: ['property.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class PropertyComponent { }
