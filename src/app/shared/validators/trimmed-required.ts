import { TrimmedRequiredValidationErrors } from './models';

export const trimmedRequired = (value: string): TrimmedRequiredValidationErrors =>
  new TrimmedRequiredValidationErrors(value.trim() ? {} : { trimmedRequired: true });
