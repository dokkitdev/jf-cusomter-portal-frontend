import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { FilterValue } from './models';

@Injectable()
export class FilterValuesFacade {
  public filterRemovedSubject: Subject<FilterValue> = new Subject();

  public removeItem(item: FilterValue): void {
    this.filterRemovedSubject.next(item);
  }
}
