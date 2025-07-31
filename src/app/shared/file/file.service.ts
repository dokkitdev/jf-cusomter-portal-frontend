import { WINDOW } from 'ngx-window-token';
import { Inject, Injectable, DOCUMENT } from '@angular/core';

@Injectable()
export class FileService {
  constructor(
    @Inject(WINDOW) private window: Window & typeof globalThis,
    @Inject(DOCUMENT) private document: Document
  ) {}

  public saveFile(data: Blob, filename: string): void {
    const anchor = this.document.createElement('a');
    anchor.download = filename;
    anchor.href = this.window.URL.createObjectURL(data);
    anchor.click();
  }

  public openInNewTab(data: Blob): void {
    this.window.open(this.window.URL.createObjectURL(data));
  }
}
