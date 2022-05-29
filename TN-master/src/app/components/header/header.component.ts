import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, Observable, throttleTime } from 'rxjs';
import {
  changeThemAction,
  signOutAction,
} from 'src/app/core/store/actions/user.action';
import {
  currentUserSelector,
  themeSelector,
} from 'src/app/core/store/selectors/user.selector';
import { CurrentUser } from 'src/app/shared/types/user.interface';
import { UserService } from 'src/app/shared/service/user.service';
import { Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'nf-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public path!: string;
  public isProfileOpen: boolean = false;
  public isSearchOpen: boolean = false;
  public isMBMenuOpen: boolean = false;
  public darkTheme$!: Observable<boolean>;
  public currentUser$!: Observable<CurrentUser | null>;

  constructor(
    private readonly store: Store,
    private readonly userService: UserService,
    private readonly router: Router
  ) {
    this.router.events
      .pipe(
        filter((e): e is RouterEvent => e instanceof RouterEvent),
        throttleTime(0)
      )
      .subscribe((e: RouterEvent) => {
        this.isMBMenuOpen && (this.isMBMenuOpen = false);
        if (e.url.split('/').length > 2) this.path = e.url.split('/')[2];
        else this.path = e.url.split('/')[0];
      });
  }

  ngOnInit(): void {
    this.currentUser$ = this.store.select(currentUserSelector);
    this.darkTheme$ = this.store.select(themeSelector);
  }

  public handleChangeThem(isDarkTheme: boolean): void {
    this.store.dispatch(changeThemAction({ isDarkTheme }));
  }

  public handleSignOut(): void {
    this.userService.signOut();
    this.store.dispatch(signOutAction());
  }
}
