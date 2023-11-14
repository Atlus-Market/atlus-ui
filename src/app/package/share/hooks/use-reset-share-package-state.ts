import { useAppDispatch } from '@/redux/hooks';
import { useCallback } from 'react';
import { reset } from '@/redux/features/share-package/share-package';

export const useResetSharePackageState = () => {
  const dispatch = useAppDispatch();

  const resetShareState = useCallback(() => {
    dispatch(reset());
  }, [dispatch]);

  return {
    resetShareState,
  };
};
