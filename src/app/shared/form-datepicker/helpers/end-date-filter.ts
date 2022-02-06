import { DateTime } from 'luxon';

export function getEndDateFilter(startDate: string): (date: Date) => boolean {
  return (date) => {
    if (!startDate) {
      return true;
    }

    return DateTime.fromJSDate(date).valueOf() > DateTime.fromISO(startDate).valueOf();
  };
}
