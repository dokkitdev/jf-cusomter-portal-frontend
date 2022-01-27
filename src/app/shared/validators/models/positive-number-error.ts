export class PositiveNumberValidationErrors {
  public positiveNumber?: boolean;

  constructor(model: Partial<PositiveNumberValidationErrors> = {}) {
    Object.assign(this, model);
  }
}
