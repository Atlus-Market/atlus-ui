'use client';

import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit';
import setPackageReducer from '@/redux/features/set-package/set-package';
import packagesReducer from '@/redux/features/packages/packages';
import { startListeners } from '@/redux/store-listeners';

export const listenerMiddleware = createListenerMiddleware();
export type ListenersMiddleware = typeof listenerMiddleware;

export const store = configureStore({
  reducer: {
    setPackageReducer,
    packagesReducer
  },
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware().prepend(listenerMiddleware.middleware)
  ],
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


startListeners();
