import { ChangeDetectionStrategy, Component, Input, TemplateRef, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomSelectOption } from '@shared/custom-select';

@Component({
  selector: 'custom-multiselect-trigger',
  templateUrl: 'trigger.html',
  styleUrls: ['trigger.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class CustomMultiselectTriggerComponent {
  @Input() customTemplate: TemplateRef<any>;
  @Input() placeholder: string;
  @Input() hasTriggerIcon: boolean;
  @Input() selectedValues$: Observable<any[]>;
  @Input() options$: Observable<CustomSelectOption<any>[]>;
  @Input() showSelectedTags: boolean = false;
  @Output() tagRemoved = new EventEmitter<any>();

  private options: CustomSelectOption<any>[] = [];

  constructor() {
    this.options$?.subscribe((options) => {
      this.options = options;
    });
  }

  public getOptionTitle(value: any): string {
    const option = this.options.find((opt) => opt.id === value);
    return option ? option.title : value.toString();
  }

  public removeTag(event: Event, value: any): void {
    event.stopPropagation();
    this.tagRemoved.emit(value);
  }
}
