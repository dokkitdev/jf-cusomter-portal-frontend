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

export class LetterTemplateGroup {
  @Expose({ name: 'group_label' })
  public groupLabel: string;

  @Expose({ name: 'letter_templates' })
  public letterTemplates: Array<LetterTemplate>;

  constructor(model: Partial<LetterTemplateGroup> = {}) {
    Object.assign(this, model);
  }
}

export class TemplateCategory {
  public groupLabel: string;
  public letterTemplates: Array<LetterTemplate>;
  public isExpanded: boolean;

  constructor(groupLabel: string, letterTemplates: Array<LetterTemplate>) {
    this.groupLabel = groupLabel;
    this.letterTemplates = letterTemplates;
    this.isExpanded = false;
  }
}
