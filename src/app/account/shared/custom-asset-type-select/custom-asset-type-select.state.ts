import { CustomAssetType } from '@shared/asset';
import { createFormControlState, FormControlState } from 'ngrx-forms';

export class AccountCustomAssetTypeSelectState {
  public items: Array<CustomAssetType>;
  public isLoading: boolean;
  public controlState: FormControlState<number>;

  constructor() {
    this.items = [];
    this.isLoading = false;
    this.controlState = createFormControlState('', 0);
  }
}
