export class FileSizeConfigs {
  public base: number;
  public symbols: { [x: string]: string };

  constructor(model: Partial<FileSizeConfigs> = {}) {
    Object.assign(this, model);
  }
}
