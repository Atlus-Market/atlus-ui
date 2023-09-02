import { ListenersMiddleware } from '@/redux/store';
import { setPatentsListener } from '@/redux/features/set-package/listeners/set-patents.listener';

export const startSetPackageListeners = (listenerMiddleware: ListenersMiddleware) => {
  [
    setPatentsListener
  ].forEach(fn => fn(listenerMiddleware));
};
