import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { fromEvent, map, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'nf-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.scss'],
})
export class SlideComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject();
  @Input() srcs!: string[];
  @Input() index!: number;

  @Output('close') onClose = new EventEmitter<number>();
  @Output('change-index') onChangeIndex = new EventEmitter<number>();

  ngOnInit(): void {
    fromEvent(window, 'keyup')
      .pipe(
        map((e) => e as KeyboardEvent),
        takeUntil(this.destroy$)
      )
      .subscribe((e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.key === 'ArrowRight') {
          this.index < this.srcs.length - 1 &&
            this.onChangeIndex.emit(this.index + 1);
        }
        if (e.key === 'ArrowLeft') {
          this.index > 0 && this.onChangeIndex.emit(this.index - 1);
        }
        if (e.key === 'Escape') this.onClose.emit(this.index);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
