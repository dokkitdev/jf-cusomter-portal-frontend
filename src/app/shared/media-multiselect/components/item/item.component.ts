import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Media } from '@shared/media';

@Component({
    selector: 'media-multiselect-item',
    templateUrl: 'item.html',
    styleUrls: ['item.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class MediaMultiselectItemComponent {
  @Input() item: Media;

  @Output() removeFile: EventEmitter<number>;

  constructor() {
    this.removeFile = new EventEmitter();
  }

  public removeItemClicked(): void {
    this.removeFile.emit();
  }
}
