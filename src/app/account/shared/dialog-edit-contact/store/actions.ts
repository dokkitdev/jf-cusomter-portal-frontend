import { createAction, props } from '@ngrx/store';
import { Contact } from '@shared/contact';

export class AccountDialogEditContactActions {
  /* tslint:disable:typedef */
  public static createContactSuccess = createAction(
    '[AccountDialogEditContact] Create Contact Success',
    props<{ contact: Contact }>()
  );

  public static updateContactSuccess = createAction(
    '[AccountDialogEditContact] Update Contact Success',
    props<{ contact: Contact }>()
  );
  /* tslint:enable:typedef */
}
