'use client';

import { AtlusModal } from '@/components/ui/modal/atlus-modal';
import { useSharePackageVisibility } from '@/app/(main)/package/share/hooks/use-share-package-visibility';
import { ShareBuyerPackageBody } from '@/app/(main)/package/share/buyer/share-buyer-package-body';
import { useResetSharePackageState } from '@/app/(main)/package/share/hooks/use-reset-share-package-state';

export const ShareBuyerPackage = () => {
  const { hideSharePackageModal, isSharePackageOpen } = useSharePackageVisibility();
  const { resetShareState } = useResetSharePackageState();

  return (
    <AtlusModal
      isOpen={isSharePackageOpen}
      onRequestClose={hideSharePackageModal}
      onAfterClose={resetShareState}
    >
      <ShareBuyerPackageBody />
    </AtlusModal>
  );
};
