import { DateTime, Info } from 'luxon';
import { Inject, Injectable, Optional } from '@angular/core';
import { MAT_DATE_LOCALE, NativeDateAdapter } from '@angular/material/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class CustomDateAdapter extends NativeDateAdapter {
  constructor(
    @Optional() @Inject(MAT_DATE_LOCALE) private matDateLocale: string,
    private translateService: TranslateService
  ) {
    super(matDateLocale);
  }

  public getFirstDayOfWeek(): number {
    return 1;
  }

  public format(date: Date, format: string): string {
    return format
      ? DateTime.fromJSDate(date).setLocale(this.translateService.currentLang).toFormat(format)
      : date.toDateString();
  }

  public getDayOfWeekNames(): Array<string> {
    const weekdays = [...Info.weekdays('short', { locale: this.translateService.currentLang })];
    weekdays.unshift(weekdays.pop() || '');

    return weekdays;
  }
}
