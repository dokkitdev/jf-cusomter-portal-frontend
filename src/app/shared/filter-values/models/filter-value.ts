import { FilterValueStatus } from '../enums';

export class FilterValue {
  public id: string;
  public value: string | number | undefined;
  public title?: string | number;
  public status?: FilterValueStatus;
  public variant?: string;

  constructor(model: Partial<FilterValue> = {}) {
    Object.assign(this, model);
  }
}
