import { MatDialogModule } from '@angular/material/dialog';
import { DialogService } from './dialog.service';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    MatDialogModule
  ],
  providers: [
    DialogService
  ]
})
export class DialogModule { }
