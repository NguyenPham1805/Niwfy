import { createAction, props } from '@ngrx/store';
import { CurrentUser } from 'src/app/shared/types/user.interface';

export enum SignInAction {
  SIGN_IN = '@User/SignIn',
  SIGN_IN_SUCCESS = '@User/SignInSuccess',
  SIGN_IN_FAILED = '@User/SignInFailed',
}

export enum SignOutAction {
  SIGN_OUT = '@User/SignOut',
  SIGN_OUT_SUCCESS = '@User/SignOutSuccess',
  SIGN_OUT_FAILED = '@User/SignOutFailed',
}

const CHANGE_THEME = '@User/ChangeTheme';

const SIGN_IN_TOGGLE = '@User/SignInToggle';

export const signInAction = createAction(SignInAction.SIGN_IN);

export const signInSuccessAction = createAction(
  SignInAction.SIGN_IN_SUCCESS,
  props<{ currentUser: CurrentUser }>()
);

export const signInFailedAction = createAction(
  SignInAction.SIGN_IN_FAILED,
  props<{ error: string }>()
);

export const signOutAction = createAction(SignOutAction.SIGN_OUT);

export const signOutSuccessAction = createAction(
  SignOutAction.SIGN_OUT_SUCCESS
);

export const signOutFailedAction = createAction(
  SignOutAction.SIGN_OUT_FAILED,
  props<{ error: string }>()
);

export const changeThemAction = createAction(
  CHANGE_THEME,
  props<{ isDarkTheme: boolean }>()
);

export const signInOpenAction = createAction(
  SIGN_IN_TOGGLE,
  props<{ isOpen: boolean }>()
);
