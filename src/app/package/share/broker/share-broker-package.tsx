'use client';

import { AtlusModal } from '@/components/ui/modal/atlus-modal';
import { ShareBrokerPackageBody } from '@/app/package/share/broker/share-broker-package-body';
import { useSharePackageVisibility } from '@/app/package/share/hooks/use-share-package-visibility';
import { useResetSharePackageState } from '@/app/package/share/hooks/use-reset-share-package-state';

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
