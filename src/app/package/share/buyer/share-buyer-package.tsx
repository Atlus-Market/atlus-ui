'use client';

import { AtlusModal } from '@/components/ui/modal/atlus-modal';
import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { reset, setSharePackageId } from '@/redux/features/share-package/share-package';
import { useSharePackageBrokerVisibility } from '@/app/package/share/broker/use-share-package-broker-visibility';
import { selectSharePackageId } from '@/redux/features/share-package/selectors/share-package.selectors';
import { ShareBuyerPackageBody } from '@/app/package/share/buyer/share-buyer-package-body';

interface ShareBrokerPackageProps {
  packageId: string;
  isShowingModal?: boolean;
}

export const ShareBuyerPackage = ({
  packageId,
  isShowingModal = false,
}: ShareBrokerPackageProps) => {
  const dispatch = useAppDispatch();
  const { hideSharePackageBroker } = useSharePackageBrokerVisibility();
  const activeSharingPackageId = useAppSelector(selectSharePackageId);

  const resetShareState = useCallback(() => {
    dispatch(reset());
  }, [dispatch]);

  useEffect(() => {
    if (isShowingModal && packageId !== activeSharingPackageId) {
      dispatch(setSharePackageId({ packageId }));
    }
  }, [packageId, dispatch, isShowingModal, activeSharingPackageId]);

  return (
    <AtlusModal
      isOpen={isShowingModal}
      onRequestClose={hideSharePackageBroker}
      onAfterClose={resetShareState}
    >
      <ShareBuyerPackageBody />
    </AtlusModal>
  );
};
