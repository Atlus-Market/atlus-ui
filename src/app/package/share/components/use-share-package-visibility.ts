import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useCallback } from 'react';
import {
  hideSharePackageModal,
  showSharePackageModal,
} from '@/redux/features/share-package/share-package';
import { selectIsShareModalOpen } from '@/redux/features/share-package/selectors/share-package.selectors';

export const useSharePackageVisibility = () => {
  const dispatch = useAppDispatch();
  const isSharePackageBrokerOpen = useAppSelector(selectIsShareModalOpen);

  const showSharePackageBroker = useCallback(() => {
    dispatch(showSharePackageModal());
  }, [dispatch]);

  const hideSharePackageBroker = useCallback(() => {
    dispatch(hideSharePackageModal());
  }, [dispatch]);

  return {
    isSharePackageBrokerOpen,
    showSharePackageBroker,
    hideSharePackageBroker,
  };
};
