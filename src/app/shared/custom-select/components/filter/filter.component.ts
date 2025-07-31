import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { CustomSelectFacade } from '@shared/custom-select';
import { Actions, FormControlState, FormControlValueTypes } from 'ngrx-forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'custom-select-filter',
  templateUrl: 'filter.html',
  styleUrls: ['filter.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class CustomSelectFilterComponent<T extends FormControlValueTypes> {
  @ViewChild('control') controlElementRef: ElementRef;

  public filterControlState$: Observable<FormControlState<string>>;

  constructor(protected facade: CustomSelectFacade<T>) {
    this.filterControlState$ = this.facade.filterControlState$;
  }

  public formActionTriggered(action: Actions<any>): void {
    this.facade.handleFilterStateAction(action);
  }

  public focusInput(): void {
    this.controlElementRef.nativeElement.focus();
  }
}
