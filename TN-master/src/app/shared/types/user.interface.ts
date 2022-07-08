export interface CurrentUser {
  uid: string;
  displayName: string;
  photoUrl: string;
  email: string;
  createdAt: Date | string;
}

export interface UserState {
  user: CurrentUser | null;
  isDarkTheme: boolean;
  isSignInOpen: boolean;
  loading: boolean;
  error: string | null;
}
