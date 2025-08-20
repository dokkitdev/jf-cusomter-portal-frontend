export interface Template {
  name: string;
  label: string;
}

export interface TemplateCategory {
  group_label: string;
  letter_templates: Array<Template>;
  isExpanded: boolean;
}

export interface TemplateData {
  categories: Array<TemplateCategory>;
}

export interface LetterTemplateResponse {
  name: string;
  label: string;
}

export interface LetterTemplateGroupResponse {
  group_label: string;
  letter_templates: Array<LetterTemplateResponse>;
}
