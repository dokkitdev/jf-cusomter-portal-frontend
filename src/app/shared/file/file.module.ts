import { FileService } from './file.service';
import { FileInputService } from './file-input.service';
import { NgModule } from '@angular/core';

@NgModule({
  providers: [FileService, FileInputService]
})
export class FileModule {}
