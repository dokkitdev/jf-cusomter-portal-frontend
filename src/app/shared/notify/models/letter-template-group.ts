import { Expose, Type } from 'class-transformer';
import { LetterTemplate } from './letter-template';

export class LetterTemplateGroup {
  @Expose({ name: 'group_label' })
  public groupLabel: string;

  @Expose({ name: 'letter_templates' })
  @Type(() => LetterTemplate)
  public letterTemplates: Array<LetterTemplate>;

  constructor(model: Partial<LetterTemplateGroup> = {}) {
    Object.assign(this, model);
  }
}
