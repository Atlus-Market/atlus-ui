'use client';

import { AtlusModal } from '@/components/ui/modal/atlus-modal';
import { ShareBrokerPackageBody } from '@/app/package/share/broker/share-broker-package-body';
import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { reset, setSharePackageId } from '@/redux/features/share-package/share-package';
import { useSharePackageBrokerVisibility } from '@/app/package/share/broker/use-share-package-broker-visibility';
import { selectSharePackageId } from '@/redux/features/share-package/selectors/share-package.selectors';

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
      <ShareBrokerPackageBody />
    </AtlusModal>
  );
};
