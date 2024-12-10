export class PublicLoginConfirmationQueryParameters {
  public email: string;

  constructor(model: Partial<PublicLoginConfirmationQueryParameters> = {}) {
    Object.assign(this, model);
  }
}
