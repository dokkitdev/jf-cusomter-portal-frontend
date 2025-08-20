export interface Template {
  name: string;
  label: string;
}

export interface TemplateCategory {
  group_label: string;
  letter_templates: Template[];
  isExpanded: boolean; // Added for UI state
}

export interface TemplateData {
  categories: TemplateCategory[];
}

// API Response interfaces (matching the exact API structure)
export interface LetterTemplateResponse {
  name: string;
  label: string;
}

export interface LetterTemplateGroupResponse {
  group_label: string;
  letter_templates: LetterTemplateResponse[];
}
