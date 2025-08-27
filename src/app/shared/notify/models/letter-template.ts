import { Expose } from 'class-transformer';

export class LetterTemplate {
  @Expose()
  public name: string;

  @Expose()
  public label: string;

  constructor(model: Partial<LetterTemplate> = {}) {
    Object.assign(this, model);
  }
}
