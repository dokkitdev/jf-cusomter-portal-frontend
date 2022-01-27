export class TrimmedRequiredValidationErrors {
  public trimmedRequired?: boolean;

  constructor(model: Partial<TrimmedRequiredValidationErrors> = {}) {
    Object.assign(this, model);
  }
}
