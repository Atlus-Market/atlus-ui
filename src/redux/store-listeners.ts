import {
  startAddPatentsListeners
} from '@/redux/features/set-package/listeners/set-package.listeners';
import { listenerMiddleware } from '@/redux/store';

export const startListeners = () => {
  startAddPatentsListeners(listenerMiddleware);
};
