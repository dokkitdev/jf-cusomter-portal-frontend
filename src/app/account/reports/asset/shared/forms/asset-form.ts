import { createFormGroupState, FormGroupState, box } from 'ngrx-forms';
import { AssetReportFormFilters } from '../../asset.state';

export const createAssetFormState = (): FormGroupState<AssetReportFormFilters> => {
  return createFormGroupState<AssetReportFormFilters>('assetForm', {
    siteId: null,
    serviceLevelNames: box([]),
    assetTypes: box([]),
    errorTypes: box([]),
    jobStages: box([])
  });
};
