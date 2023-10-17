'use client';

import { AtlusModal } from '@/components/ui/modal/atlus-modal';
import { ShareBrokerPackageBody } from '@/app/package/share/broker/share-broker-package-body';
import { useCallback, useEffect } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { reset, setSharePackageId } from '@/redux/features/share-package/share-package';
import { useSharePackageBrokerVisibility } from '@/app/package/share/broker/use-share-package-broker-visibility';

interface ShareBrokerPackageProps {
  packageId: string;
  isShowingModal?: boolean;
}

export const ShareBrokerPackage = ({
  packageId,
  isShowingModal = false,
}: ShareBrokerPackageProps) => {
  const dispatch = useAppDispatch();
  const { hideSharePackageBroker } = useSharePackageBrokerVisibility();

  const resetShareState = useCallback(() => {
    dispatch(reset());
  }, [dispatch]);

  useEffect(() => {
    if (isShowingModal) {
      dispatch(setSharePackageId({ packageId }));
    }
  }, [packageId, dispatch, isShowingModal]);

  return (
    <AtlusModal
      isOpen={isShowingModal}
      onRequestClose={hideSharePackageBroker}
      onAfterClose={resetShareState}
    >
      <ShareBrokerPackageBody />
    </AtlusModal>
  );
};
