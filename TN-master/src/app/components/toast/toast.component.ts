import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { delay, Observable, Subject, timer } from 'rxjs';
import { removeToatAction } from 'src/app/core/store/actions/toast.action';
import { toastSelector } from 'src/app/core/store/selectors/toast.selector';
import { themeSelector } from 'src/app/core/store/selectors/user.selector';
import { Message } from 'src/app/shared/types/message.interface';

@Component({
  selector: 'nf-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent implements OnInit {
  public isDarktheme$!: Observable<boolean>;
  public messages: Message[] = [];

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.isDarktheme$ = this.store.select(themeSelector);
    this.store
      .select(toastSelector)
      .subscribe((messages) => (this.messages = messages));
  }
}
