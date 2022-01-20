import { createAction, props } from '@ngrx/store';

export class AccountDialogEditUserActions {
  /* tslint:disable:typedef */
  public static createUserSuccess = createAction(
    '[AccountDialogEditUser] Create User Success',
    props<{ userID: number }>()
  );

  public static updateUserSuccess = createAction(
    '[AccountDialogEditUser] Update User Success',
    props<{ userID: number }>()
  );
  /* tslint:enable:typedef */
}
