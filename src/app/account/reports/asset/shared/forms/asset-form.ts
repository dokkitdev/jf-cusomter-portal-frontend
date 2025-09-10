import { createFormGroupState, FormGroupState } from 'ngrx-forms';
import { AssetReportFilters } from '../../asset.state';

export interface AccountReportsAssetPageForm {
  site: string;
  serviceLevel: string[];
  assetType: string[];
  error: string[];
  stage: string[];
}

export const createAssetFormState = (): FormGroupState<AccountReportsAssetPageForm> => {
  return createFormGroupState<AccountReportsAssetPageForm>('assetForm', {
    site: '',
    serviceLevel: [],
    assetType: [],
    error: [],
    stage: []
  });
};
