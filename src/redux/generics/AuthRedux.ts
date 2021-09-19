import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@redux/store';
import { UserType } from '@adapters/authAdapter';

interface AuthState {
  access_token?: string;
  refresh_token?: string;
  username?: string;
  permissions: UserType;
  isLoggingIn: boolean;
}

const initialState: AuthState = {
  permissions: 'default',
  isLoggingIn: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken: (state, { payload }: PayloadAction<string>) => {
      state.access_token = payload;
    },
    setRefreshToken: (state, { payload }: PayloadAction<string>) => {
      state.refresh_token = payload;
    },
    setUsername: (state, { payload }: PayloadAction<string>) => {
      state.username = payload;
    },
    setPermissions: (state, { payload }: PayloadAction<UserType>) => {
      state.permissions = payload;
    },
    logout: (state) => {
      state.username = undefined;
      state.access_token = undefined;
      state.refresh_token = undefined;
      state.permissions = 'default';
    },
    setIsLoggingIn: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoggingIn = payload;
    },
  },
});

export const selectAuth = (state: RootState) => state.auth;
export const selectIsLoggedIn = (state: RootState) =>
  Boolean(state.auth.refresh_token);
export const selectIsLoggingIn = (state: RootState) => state.auth.isLoggingIn;

export const authActions = authSlice.actions;
export default authSlice.reducer;
