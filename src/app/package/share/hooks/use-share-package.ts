import { Package } from '@/models/package';
import { useSharePackageVisibility } from '@/app/package/share/hooks/use-share-package-visibility';
import { useAppDispatch } from '@/redux/hooks';
import { Visibility } from '@/components/common/dropdown/visibility-options';
import { useCallback } from 'react';
import { setSharePackageData } from '@/redux/features/share-package/share-package';

interface UseSharePackageProps {
  atlusPackage: Pick<Package, 'id' | 'visibility'>;
}

interface UseSharePackageResult {
  sharePackage: () => void;
}

export const useSharePackage = ({ atlusPackage }: UseSharePackageProps): UseSharePackageResult => {
  const { showSharePackageModal } = useSharePackageVisibility();
  const dispatch = useAppDispatch();
  const { id, visibility } = atlusPackage;

  const sharePackage = useCallback(() => {
    const isPrivatePackage = visibility === Visibility.Private;
    dispatch(setSharePackageData({ packageId: id, isPrivatePackage }));
    showSharePackageModal();
  }, [visibility, dispatch, id, showSharePackageModal]);

  return {
    sharePackage,
  };
};
