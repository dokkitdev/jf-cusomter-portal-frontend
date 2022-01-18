export class ValidationMessages {
  [x: string]: string;

  constructor(model: Partial<ValidationMessages> = {}) {
    Object.assign(this, model);
  }
}
