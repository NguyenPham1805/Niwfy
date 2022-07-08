import { Injectable } from '@angular/core';
import { CanLoad } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { currentUserSelector } from 'src/app/core/store/selectors/user.selector';

@Injectable({
  providedIn: 'root',
})
export class UserGuard implements CanLoad {
  constructor(private readonly store: Store) {}

  canLoad(): Observable<boolean> {
    return this.store.select(currentUserSelector).pipe(map((user) => !!user));
  }
}
