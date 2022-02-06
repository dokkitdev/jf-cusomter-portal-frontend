import { DateTime } from 'luxon';

export function getStartDateFilter(endDate: string): (date: Date) => boolean {
  return (date) => {
    if (!endDate) {
      return true;
    }

    return DateTime.fromJSDate(date).valueOf() < DateTime.fromISO(endDate).valueOf();
  };
}
