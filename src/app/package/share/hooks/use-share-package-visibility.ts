import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useCallback } from 'react';
import {
  hideSharePackageModal as hideSharePackageModalAction,
  showSharePackageModal as showSharePackageModalAction,
} from '@/redux/features/share-package/share-package';
import { selectIsShareModalOpen } from '@/redux/features/share-package/selectors/share-package.selectors';

export const useSharePackageVisibility = () => {
  const dispatch = useAppDispatch();
  const isSharePackageOpen = useAppSelector(selectIsShareModalOpen);

  const showSharePackageModal = useCallback(() => {
    dispatch(showSharePackageModalAction());
  }, [dispatch]);

  const hideSharePackageModal = useCallback(() => {
    dispatch(hideSharePackageModalAction());
  }, [dispatch]);

  return {
    isSharePackageOpen,
    showSharePackageModal,
    hideSharePackageModal,
  };
};
