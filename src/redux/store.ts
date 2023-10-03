'use client';

import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit';
import setPackageReducer from '@/redux/features/set-package/set-package';
import packagesReducer from '@/redux/features/packages/packages';
import sharePackageReducer from '@/redux/features/share-package/share-package';
import { startListeners } from '@/redux/store-listeners';
import { isRunningProd } from '@/utils/env';
import LogRocket from 'logrocket';

export const listenerMiddleware = createListenerMiddleware();
export type ListenersMiddleware = typeof listenerMiddleware;

export const store = configureStore({
  reducer: {
    setPackageReducer,
    packagesReducer,
    sharePackageReducer,
  },
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware()
      .prepend(listenerMiddleware.middleware)
      .concat(isRunningProd ? LogRocket.reduxMiddleware() : []),
  ],
  devTools: !isRunningProd,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

startListeners();
