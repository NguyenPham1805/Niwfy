import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { GoogleAuthProvider, FacebookAuthProvider } from '@firebase/auth';
import {
  signInAction,
  signInOpenAction,
} from 'src/app/core/store/actions/user.action';
import { UserService } from 'src/app/shared/service/user.service';
import { Observable } from 'rxjs';
import { signInToggleSelector } from 'src/app/core/store/selectors/user.selector';

@Component({
  selector: 'nf-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  public isOpen$!: Observable<boolean>;
  @Input('dark-theme') isDarkTheme: boolean = true;

  constructor(
    private readonly store: Store,
    private readonly userService: UserService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.isOpen$ = this.store.select(signInToggleSelector);
    }, 0);
  }

  public handleGGSignIn(): void {
    this.store.dispatch(signInAction());
    this.userService.signIn(new GoogleAuthProvider());
  }

  public handleFBSignIn(): void {
    this.store.dispatch(signInAction());
    this.userService.signIn(new FacebookAuthProvider());
  }

  public handleSignInClose(): void {
    this.store.dispatch(signInOpenAction({ isOpen: false }));
  }
}
