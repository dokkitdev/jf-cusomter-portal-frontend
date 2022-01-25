export class HeaderSortParameters {
  public orderBy: string;
  public desc: boolean;

  constructor(model: Partial<HeaderSortParameters> = {}) {
    Object.assign(this, model);
  }
}
