import { configureStore } from '@reduxjs/toolkit';
import { membersCounterSlice } from './slices/membersCounter';
import themeSlice from './slices/themeSlice';

export type AppDispatch = typeof store.dispatch;
export interface RootState {
  membersCounter: membersCounterState;
  theme: themeState;
}

export interface membersCounterState {
  value: number;
}

export interface themeState {
  mode: 'light' | 'dark';
}

export const store = configureStore({
  reducer: {
    membersCounter: membersCounterSlice.reducer,
    theme: themeSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
