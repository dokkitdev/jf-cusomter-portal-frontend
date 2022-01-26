import { PositiveNumberValidationErrors } from './models';

export const positiveNumber = (value: number): PositiveNumberValidationErrors =>
  new PositiveNumberValidationErrors((value > 0) ? {} : { positiveNumber: true });
