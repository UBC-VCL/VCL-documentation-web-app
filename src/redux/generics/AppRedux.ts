import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@redux/store';
import { CONSTANTS } from '@statics';

export interface ModalState {
  visible: boolean;
  data?: Object;
}

export type ValidModalKey =
  typeof CONSTANTS.MODALS[keyof typeof CONSTANTS.MODALS];

interface AppState {
  isReady: boolean;
  modals: Record<ValidModalKey, ModalState>;
}

const initialState: AppState = {
  isReady: false,
  modals: {
    login: {
      visible: false,
    },
  },
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setIsReady: (state, { payload }: PayloadAction<boolean>) => {
      state.isReady = payload;
    },
    openModal: (
      state,
      {
        payload,
      }: PayloadAction<{
        key: ValidModalKey;
        data?: Object;
      }>
    ) => {
      state.modals[payload.key] = {
        visible: true,
        data: payload.data,
      };
    },
    closeModal: (
      state,
      { payload }: PayloadAction<{ key: ValidModalKey; data?: Object }>
    ) => {
      state.modals[payload.key] = {
        visible: false,
        data: payload.data,
      };
    },
  },
});

export const selectApp = (state: RootState) => state.app;
export const selectModal = (modalKey: ValidModalKey) => (state: RootState) =>
  state.app.modals[modalKey];

export const appActions = appSlice.actions;
export default appSlice.reducer;
