import { NgrxValueConverter, NgrxValueConverters } from 'ngrx-forms';

export const dateValueConverter: NgrxValueConverter<Date | null, string | null> = {
  convertViewToStateValue: (value: Date): string | null => {
    if (value === null) {
      return null;
    }

    return NgrxValueConverters.dateToISOString.convertViewToStateValue(value);
  },
  convertStateToViewValue: NgrxValueConverters.dateToISOString.convertStateToViewValue
};
