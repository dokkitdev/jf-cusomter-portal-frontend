import { createAction, props } from '@ngrx/store';

export class AccountDialogAddDocumentActions {
  /* tslint:disable:typedef */
  public static createDocumentSuccess = createAction(
    '[AccountDialogAddDocument] Create Document Success',
    props<{ documentID: number }>()
  );
  /* tslint:enable:typedef */
}
