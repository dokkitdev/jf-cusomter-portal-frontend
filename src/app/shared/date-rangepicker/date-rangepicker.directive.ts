import {
  Directive,
  ElementRef,
  EventEmitter,
  OnDestroy,
  Output,
  OnInit,
  Inject,
  PLATFORM_ID
} from '@angular/core';
import { DatepickerDropdownPositionY } from '@angular/material/datepicker';
import { find } from 'lodash';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[datepickerPositionY]'
})
export class DateRangepickerDirective implements OnInit, OnDestroy {
  @Output() positionYChanged: EventEmitter<DatepickerDropdownPositionY>;

  public observer: MutationObserver;

  constructor(
    private elementRef: ElementRef,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Record<string, unknown>
  ) {
    this.positionYChanged = new EventEmitter();
  }

  public ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.observer = new MutationObserver((mutationsList) => {
        if (find(mutationsList, { type: 'childList' })) {
          this.checkPosition();
        }
      });

      this.observer.observe(this.document.body, { childList: true, subtree: true });
    }
  }

  public ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  public checkPosition(): void {
    const calendarElement = this.document.querySelector('.mat-calendar');

    if (calendarElement) {
      const elementBounding = this.elementRef.nativeElement.getBoundingClientRect();
      const calendarBounding = calendarElement.getBoundingClientRect();

      if (calendarBounding.top > elementBounding.top) {
        this.positionYChanged.emit('below');
      } else {
        this.positionYChanged.emit('above');
      }
    }
  }
}
