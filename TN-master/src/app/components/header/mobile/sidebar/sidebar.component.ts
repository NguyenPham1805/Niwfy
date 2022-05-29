import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { addToatAction } from 'src/app/core/store/actions/toast.action';
import { signInOpenAction } from 'src/app/core/store/actions/user.action';
import { currentUserSelector } from 'src/app/core/store/selectors/user.selector';
import { routes } from 'src/app/shared/header-routes';
import { CurrentUser } from 'src/app/shared/types/user.interface';

@Component({
  selector: 'nf-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  public headerRoutes = routes;
  public user$!: Observable<CurrentUser | null>;

  @Input() path!: string;
  @Input() isOpen!: boolean;
  @Input('dark-theme') isDarkTheme: boolean = false;
  @Output('close') onClose = new EventEmitter();
  @Output('sign-out') onSignOut = new EventEmitter();

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.user$ = this.store.select(currentUserSelector);
  }

  public handleOpenDropdown(btn: HTMLButtonElement): void {
    btn.classList.toggle('open-dropdown');
  }

  public handleOpenSignIn(): void {
    this.store.dispatch(signInOpenAction({ isOpen: true }));
  }

  public openToast(): void {
    this.store.dispatch(
      addToatAction({
        message: {
          content:
            'Tính năng này chưa làm nhưng ad vẫn bỏ vô cho vui, có gì update sau, ae chờ ad nhé!!',
          type: 'info',
        },
      })
    );
  }
}
