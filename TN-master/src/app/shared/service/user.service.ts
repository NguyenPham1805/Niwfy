import { Injectable, OnDestroy } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthProvider } from '@firebase/auth';
import { Store } from '@ngrx/store';
import { catchError, of, Subscription } from 'rxjs';
import { addToatAction } from 'src/app/core/store/actions/toast.action';
import {
  signInSuccessAction,
  signOutSuccessAction,
} from 'src/app/core/store/actions/user.action';

import { CurrentUser } from '../types/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService implements OnDestroy {
  private authStateSubscription$!: Subscription;

  constructor(
    private readonly afs: AngularFirestore,
    private readonly afAuth: AngularFireAuth,
    private readonly store: Store
  ) {
    this.authStateSubscription$ = this.afAuth.authState
      .pipe(
        catchError((error: FirebaseError) => {
          this.store.dispatch(
            addToatAction({
              message: {
                content: 'Đăng nhập không thành công lỗi ' + error.message,
                type: 'error',
              },
            })
          );
          return of(error);
        })
      )
      .subscribe((res) => {
        if (!(res instanceof FirebaseError) && res) {
          const userData = {
            uid: res?.uid,
            displayName: res?.displayName,
            photoUrl: res?.photoURL,
            email: res?.email,
            createdAt: res?.metadata.creationTime,
          } as CurrentUser;
          this.store.dispatch(signInSuccessAction({ currentUser: userData }));
          this.store.dispatch(
            addToatAction({
              message: {
                content: 'Đăng nhập thành công!',
                type: 'success',
              },
            })
          );
          this.setUser(userData);
        } else {
          this.store.dispatch(signOutSuccessAction());
          this.store.dispatch(
            addToatAction({
              message: {
                content: 'Bạn vừa đăng xuất!',
                type: 'info',
              },
            })
          );
        }
      });
  }
  ngOnDestroy(): void {
    this.authStateSubscription$.unsubscribe();
  }

  public signIn(authProvider: AuthProvider) {
    return this.afAuth.signInWithPopup(authProvider);
  }

  public setUser(user: CurrentUser): void {
    const userRef = this.afs.doc<any>(`users/${user.uid}`);
    userRef.set(user);
  }

  public signOut(): Promise<void> {
    return this.afAuth.signOut();
  }
}
