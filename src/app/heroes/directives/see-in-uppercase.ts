import { Directive, ElementRef, inject, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appSeeInUppercase]',
})
export class SeeInUppercase {
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);
  ngOnInit(): void {
    this.renderer.setStyle(
      this.el.nativeElement,
      'text-transform',
      'uppercase'
    );
  }
}
