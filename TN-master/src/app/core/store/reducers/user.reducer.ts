import { createReducer, on } from '@ngrx/store';
import * as UserAction from 'src/app/core/store/actions/user.action';
import { UserState } from 'src/app/shared/types/user.interface';
import { changeTheme } from 'src/app/shared/utils';

const userState: UserState = {
  user: null,
  loading: false,
  isDarkTheme: JSON.parse(localStorage.getItem('theme')!),
  isSignInOpen: false,
  error: '',
};

changeTheme(JSON.parse(localStorage.getItem('theme')!));

export const userReducer = createReducer(
  userState,
  on(
    UserAction.signInAction,
    (state): UserState => ({
      ...state,
      loading: true,
    })
  ),
  on(
    UserAction.signInSuccessAction,
    (state, action): UserState => ({
      ...state,
      user: action.currentUser,
      loading: false,
      error: '',
    })
  ),
  on(
    UserAction.signInFailedAction,
    (state, action): UserState => ({
      ...state,
      loading: false,
      error: action.error,
    })
  ),
  on(
    UserAction.signOutAction,
    (state): UserState => ({
      ...state,
      loading: true,
    })
  ),
  on(
    UserAction.signOutSuccessAction,
    (state): UserState => ({
      ...state,
      user: null,
      loading: false,
      error: '',
    })
  ),
  on(
    UserAction.signOutFailedAction,
    (state, action): UserState => ({
      ...state,
      loading: false,
      error: action.error,
    })
  ),
  on(UserAction.changeThemAction, (state, action) => {
    localStorage.setItem('theme', JSON.stringify(action.isDarkTheme)!);
    changeTheme(action.isDarkTheme);
    return {
      ...state,
      isDarkTheme: action.isDarkTheme,
    };
  }),
  on(UserAction.signInOpenAction, (state, action) => {
    return {
      ...state,
      isSignInOpen: action.isOpen,
    };
  })
);
