import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';

// Generic reducer imports go here
import appReducer from './generics/AppRedux'
import authReducer from './generics/AuthRedux';
// Component/Page reducer imports go here
// ...

// Persist config
const createPersistConfig = (key: string, blacklist?: string[]) => ({
  key,
  storage,
  blacklist,
});

const rootReducer = combineReducers({
  app: appReducer,
  auth: persistReducer(createPersistConfig("auth"), authReducer),
});

export const store = configureStore({
  reducer: rootReducer,
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
