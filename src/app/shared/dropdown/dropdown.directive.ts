import {
  AfterViewChecked,
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  Output,
  Renderer2
} from '@angular/core';

@Directive({
  selector: '[dropdown]'
})
export class DropdownDirective implements OnDestroy, AfterViewInit, AfterViewChecked {
  @Input() id: string;
  @Input() closeByClick: boolean;
  @Input() closeByOutsideClick: boolean;

  @Output() opened: EventEmitter<boolean>;

  private closed: boolean;
  private dropdownItemElements: Array<HTMLElement>;
  private subscriptions: Array<() => void>;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {
    this.closed = true;
    this.closeByClick = true;
    this.closeByOutsideClick = true;
    this.opened = new EventEmitter();
    this.dropdownItemElements = [];
    this.subscriptions = [];
  }

  public ngAfterViewInit(): void {
    const linkElement = this.elementRef.nativeElement.querySelector('.dropdown-trigger');
    if (linkElement) {
      this.subscriptions.push(
        this.renderer.listen(linkElement, 'click', this.toggle.bind(this))
      );
    }
  }

  public ngAfterViewChecked(): void {
    this.addListenersForDropdownItems();
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription());
  }

  @HostListener('document:click', ['$event.target'])
  public onOutsideClick(targetElement: Element): void {
    if (!this.elementRef.nativeElement.contains(targetElement) && !this.closed && this.closeByOutsideClick) {
      this.close();
    }
  }

  private toggle(): void {
    if (this.closed) {
      this.open();
    } else {
      this.close();
    }
  }

  private onDropdownItemClick(): void {
    if (this.closeByClick) {
      this.close();
    }
  }

  private addListenersForDropdownItems(): void {
    const dropdownItemElements = this.elementRef.nativeElement.querySelectorAll('.dropdown-item');

    if (dropdownItemElements) {
      dropdownItemElements.forEach((dropdownItemElement: HTMLElement) => {
        if (!this.dropdownItemElements.includes(dropdownItemElement)) {
          this.subscriptions.push(
            this.renderer.listen(dropdownItemElement, 'click', this.onDropdownItemClick.bind(this))
          );
          this.dropdownItemElements.push(dropdownItemElement);
        }
      });
    }
  }

  private open(): void {
    this.renderer.addClass(this.elementRef.nativeElement, 'dropdown-open');
    this.closed = false;
    this.opened.emit(true);
  }

  private close(): void {
    this.renderer.removeClass(this.elementRef.nativeElement, 'dropdown-open');
    this.closed = true;
    this.opened.emit(false);
  }
}
