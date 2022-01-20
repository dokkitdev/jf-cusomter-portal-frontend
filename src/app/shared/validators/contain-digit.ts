import { ContainDigitValidationErrors } from './models';

export const containDigit = (value: string): ContainDigitValidationErrors =>
  new ContainDigitValidationErrors((/\d/.test(value) ? {} : { containDigit: true }));
