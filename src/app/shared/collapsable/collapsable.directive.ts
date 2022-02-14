import { AfterViewInit, Directive, Input, ElementRef, Renderer2 } from '@angular/core';
import { configuration } from '@configurations';

@Directive({
  selector: '[collapsable]'
})
export class CollapsableDirective implements AfterViewInit {
  @Input() collapsableHeight: number;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {
    this.collapsableHeight = configuration.collapsable.height;
  }

  public ngAfterViewInit(): void {
    const collapsableContentElement = this.elementRef.nativeElement.querySelector('.collapsable-content');
    const toggleElement = this.elementRef.nativeElement.querySelector('.collapsable-toggle');

    if (collapsableContentElement.clientHeight < this.collapsableHeight) {
      this.renderer.setStyle(toggleElement, 'display', 'none');
    }
  }
}
