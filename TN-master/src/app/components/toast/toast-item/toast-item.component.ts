import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { delay, Subscription, timer, interval } from 'rxjs';
import { removeToatAction } from 'src/app/core/store/actions/toast.action';
import { Message } from 'src/app/shared/types/message.interface';

@Component({
  selector: 'nf-toast-item',
  templateUrl: './toast-item.component.html',
  styleUrls: ['./toast-item.component.scss'],
})
export class ToastItemComponent implements OnInit {
  public timeline: number = 100;
  private timerSubscription$!: Subscription;
  private intervalSubscription$!: Subscription;
  @Input() toast!: Message;
  @Input() index!: number;
  @Input('dark-theme') isDarktheme!: boolean;

  @ViewChild('eToast') eToast!: ElementRef<HTMLDivElement>;

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.intervalSubscription$ = interval(10).subscribe((time) => {
      if (this.timeline / time <= 0) {
        this.intervalSubscription$.unsubscribe();
      }
      this.timeline = 100 - time / 5.2;
    });

    delay(200);
    this.timerSubscription$ = timer(5400).subscribe(() => {
      this.eToast.nativeElement.classList.add('removed');
      this.intervalSubscription$.unsubscribe();
      setTimeout(() => {
        this.store.dispatch(removeToatAction({ index: this.index }));
      }, 400);
    });
  }

  public handleRemoveToast() {
    this.timerSubscription$.unsubscribe();
    this.intervalSubscription$.unsubscribe();
    this.eToast.nativeElement.classList.add('removed');
    timer(400).subscribe(() => {
      this.store.dispatch(removeToatAction({ index: this.index }));
    });
  }
}
