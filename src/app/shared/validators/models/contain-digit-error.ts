export class ContainDigitValidationErrors {
  public containDigit?: boolean;

  constructor(model: Partial<ContainDigitValidationErrors> = {}) {
    Object.assign(this, model);
  }
}
