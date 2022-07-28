import {
  Directive,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Directive({
  selector: '[nf-debounce-click]',
})
export class DebounceClickDirective implements OnInit, OnDestroy {
  @Input() debounceTime: number = 500;
  @Output() debounceClick = new EventEmitter<Event>();

  private click$ = new Subject<Event>();
  private subscription$!: Subscription;

  ngOnInit(): void {
    this.subscription$ = this.click$
      .pipe(debounceTime(this.debounceTime))
      .subscribe((e) => this.debounceClick.emit(e));
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  @HostListener('event', ['$event'])
  clickEvent(e: Event): void {
    e.preventDefault();
    e.stopPropagation();
    this.click$.next(e);
  }
}
