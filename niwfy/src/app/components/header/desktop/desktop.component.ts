import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Store } from '@ngrx/store';

import { fromEvent, timer } from 'rxjs';
import { addToatAction } from 'src/app/core/store/actions/toast.action';
import { signInOpenAction } from 'src/app/core/store/actions/user.action';
import { routes } from 'src/app/shared/header-routes';
import { CurrentUser } from 'src/app/shared/types/user.interface';

@Component({
  selector: 'nf-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.scss'],
})
export class DesktopComponent implements OnInit, AfterViewInit {
  public headerRoutes = routes;
  public abPosition!: number;
  public abWidth!: number;
  public navbarChange = false;
  public navbarToggle = false;

  private lastScrollTop = 0;
  private navItems!: NodeListOf<HTMLLIElement>;

  @Input() path!: string;
  @Input() user: CurrentUser | null = null;
  @Input('dark-theme') isDarkTheme: boolean = true;
  @Output('open-profile') onProfileOpen = new EventEmitter();
  @Output('open-search') onSearchOpen = new EventEmitter();
  @Output('change-theme') onChangeTheme = new EventEmitter<boolean>();
  @Output('sign-out') onSignOut = new EventEmitter();

  constructor(private readonly store: Store) {}

  ngAfterViewInit(): void {
    this.navItems = document.querySelectorAll<HTMLLIElement>('.menu-item');
    this.navItems.forEach((item) => {
      fromEvent(item, 'mousemove').subscribe(() =>
        this.handleAnimationBar(item)
      );
      fromEvent(item, 'mouseleave').subscribe(() => this.handleActiveLi());
    });
    timer(0).subscribe(() => this.handleActiveLi());
  }

  ngOnInit(): void {
    fromEvent(window, 'scroll').subscribe(() => {
      this.scrollTop();
      this.scrollToggle();
    });
  }

  private scrollToggle(): void {
    if (window.pageYOffset >= 55) {
      let scrollTop = window.pageYOffset;
      this.navbarToggle = scrollTop >= this.lastScrollTop;
      this.lastScrollTop = scrollTop;
    }
  }

  private scrollTop(): void {
    if (window.pageYOffset > 0) this.navbarChange = true;
    else this.navbarChange = false;
  }

  private handleAnimationBar(item: HTMLLIElement): void {
    this.abWidth = item?.offsetWidth;
    this.abPosition = item?.offsetLeft;
  }

  private handleActiveLi(): void {
    const navItemActive =
      document.querySelector<HTMLLIElement>('.nav-item.active');
    this.abPosition = navItemActive?.offsetLeft || 0;
    this.abWidth = navItemActive?.offsetWidth || 0;
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
