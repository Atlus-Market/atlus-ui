'use client';

import { configureStore } from '@reduxjs/toolkit';
import setPackageReducer from '@/redux/features/set-package/set-package';


export const store = configureStore({
  reducer: {
    setPackageReducer
  },
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
