import { ComponentType } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { configuration } from '@configurations';

@Injectable()
export class DialogService {
  constructor(
    private matDialog: MatDialog
  ) { }

  public open<Component, Data = any>(
    component: ComponentType<Component>,
    config: MatDialogConfig<Data> = {}
  ): MatDialogRef<Component> {
    return this.matDialog.open(component, { ...configuration.dialog, ...config });
  }

  public close(id?: string, result?: any): void {
    if (id) {
      const dialog = this.matDialog.getDialogById(id);
      dialog?.close(result);

      return;
    }

    this.matDialog.closeAll();
  }
}
