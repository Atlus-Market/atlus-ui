'use client';

import { AtlusModal } from '@/components/ui/modal/atlus-modal';
import { ShareBrokerPackageBody } from '@/app/(main)/package/share/broker/share-broker-package-body';
import { useSharePackageVisibility } from '@/app/(main)/package/share/hooks/use-share-package-visibility';
import { useResetSharePackageState } from '@/app/(main)/package/share/hooks/use-reset-share-package-state';

export const ShareBrokerPackage = () => {
  const { hideSharePackageModal, isSharePackageOpen } = useSharePackageVisibility();
  const { resetShareState } = useResetSharePackageState();

  return (
    <AtlusModal
      isOpen={isSharePackageOpen}
      onRequestClose={hideSharePackageModal}
      onAfterClose={resetShareState}
    >
      <ShareBrokerPackageBody />
    </AtlusModal>
  );
};
