import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Template } from '../../models';

@Component({
  selector: 'template-category',
  templateUrl: 'category.html',
  styleUrls: ['category.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class AccountTemplateCategoryComponent {
  @Input() template!: Template;
  @Output() uploadClicked = new EventEmitter<Template>();
  @Output() downloadClicked = new EventEmitter<Template>();

  public onUploadClicked(template: Template): void {
    this.uploadClicked.emit(template);
  }

  public onDownloadClicked(template: Template): void {
    this.downloadClicked.emit(template);
  }
}
