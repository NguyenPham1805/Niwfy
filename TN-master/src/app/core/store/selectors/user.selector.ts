import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from 'src/app/shared/types/user.interface';

const userFeatureSelector = createFeatureSelector<UserState>('user');

export const currentUserSelector = createSelector(
  userFeatureSelector,
  (userState: UserState) => userState.user
);

export const userLoadingSelector = createSelector(
  userFeatureSelector,
  (userState: UserState) => userState.loading
);

export const userErrorSelector = createSelector(
  userFeatureSelector,
  (userState: UserState) => userState.error
);

export const themeSelector = createSelector(
  userFeatureSelector,
  (userState: UserState) => userState.isDarkTheme
);

export const signInToggleSelector = createSelector(
  userFeatureSelector,
  (userState: UserState) => userState.isSignInOpen
);
