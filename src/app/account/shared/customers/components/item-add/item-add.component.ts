import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'account-customers-item-add',
    templateUrl: 'item-add.html',
    styleUrls: ['item-add.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class AccountCustomersItemAddComponent {
  @Input() isDisabled: boolean;

  @Output() addNewItem: EventEmitter<void>;

  constructor() {
    this.addNewItem = new EventEmitter();
  }

  public addNewItemClicked(): void {
    this.addNewItem.emit();
  }
}
