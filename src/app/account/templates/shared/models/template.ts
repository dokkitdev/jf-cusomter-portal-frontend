export interface Template {
  id: string;
  name: string;
  categoryId: string;
  hasFile?: boolean;
  mediaId?: number;
}

export interface TemplateCategory {
  id: string;
  name: string;
  templates: Template[];
  isExpanded?: boolean;
}

export interface TemplateData {
  categories: TemplateCategory[];
}
