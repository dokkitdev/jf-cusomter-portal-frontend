import { createFormGroupState, FormGroupState } from 'ngrx-forms';
import { AssetReportFormFilters } from '../../asset.state';

export const createAssetFormState = (): FormGroupState<AssetReportFormFilters> => {
  return createFormGroupState<AssetReportFormFilters>('assetForm', {
    siteId: null,
    serviceLevelNames: [],
    assetTypes: [],
    errorTypes: [],
    jobStages: []
  });
};
