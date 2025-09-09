import { Injectable, Inject, DOCUMENT } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export interface FileInputOptions {
  accept?: string;
  multiple?: boolean;
  fileFilter?: (file: File) => boolean;
  validationError?: string;
}

export interface FileInputResult {
  files: Array<File>;
  error?: string;
}

@Injectable()
export class FileInputService {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  public selectFiles(options: FileInputOptions = {}): Observable<FileInputResult> {
    const result$ = new Subject<FileInputResult>();

    const input = this.document.createElement('input');
    input.type = 'file';

    if (options.accept) {
      input.accept = options.accept;
    }

    if (options.multiple) {
      input.multiple = true;
    }

    input.onchange = (event: Event) => {
      const target = event.target as HTMLInputElement;
      const files = Array.from(target.files || []);

      if (files.length === 0) {
        result$.next({ files: [] });
        result$.complete();

        return;
      }

      if (options.fileFilter) {
        const invalidFiles = files.filter((file) => !options.fileFilter!(file));
        if (invalidFiles.length > 0) {
          result$.next({
            files: [],
            error: options.validationError || 'Invalid file type selected'
          });
          result$.complete();

          return;
        }
      }

      result$.next({ files });
      result$.complete();
    };

    input.oncancel = () => {
      result$.next({ files: [] });
      result$.complete();
    };

    input.click();

    return result$.asObservable();
  }

  public isValidDocxFile(file: File): boolean {
    return file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
  }

  public getDocxFileInputOptions(): FileInputOptions {
    return {
      accept: '.docx',
      multiple: false,
      fileFilter: (file: File) => this.isValidDocxFile(file),
      validationError: 'Please select a valid .docx file'
    };
  }
}
