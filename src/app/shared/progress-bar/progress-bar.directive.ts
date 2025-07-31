import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';

@Directive({
  selector: '[progressBar]',
  standalone: false
})
export class ProgressBarDirective implements OnChanges {
  @Input() progress: number;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {}

  public ngOnChanges(): void {
    this.renderer.setStyle(this.elementRef.nativeElement, 'width', `${this.progress}%`);
  }
}
