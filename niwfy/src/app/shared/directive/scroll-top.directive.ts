import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[nf-scroll-top]',
})
export class ScrollTopDirective {
  constructor(private el: ElementRef) {
    this.el.nativeElement.style.display = 'none';
  }

  @HostListener('click', ['$event'])
  onClick() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    if (window.pageYOffset > 800) this.el.nativeElement.style.display = 'flex';
    else this.el.nativeElement.style.display = 'none';
  }
}
