import { Directive, Host, Input } from '@angular/core';
import { NgForOf } from '@angular/common';
import { get } from 'lodash';

@Directive({
  selector: '[ngForTrackByProperty]',
})
export class NgForTrackByPropertyDirective<T> {
  @Input() public ngForTrackByProperty: keyof T;

  constructor(@Host() private ngFor: NgForOf<T>) {
    this.ngFor.ngForTrackBy = (index: number, item: T) => {
      if (this.ngForTrackByProperty) {
        return get(item, this.ngForTrackByProperty);
      }

      return index;
    };
  }
}
