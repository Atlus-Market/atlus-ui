'use client';

import { AtlusModal } from '@/components/ui/modal/atlus-modal';
import { ShareBrokerPackageBody } from '@/app/package/share/broker/share-broker-package-body';
import { useCallback, useEffect } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { reset, setSharePackageId } from '@/redux/features/share-package/share-package';

interface ShareBrokerPackageProps {
  packageId: string;
  isShowingModal?: boolean;
  closeModal?: () => void;
}

export const ShareBrokerPackage = ({
  packageId,
  isShowingModal = false,
  closeModal,
}: ShareBrokerPackageProps) => {
  const dispatch = useAppDispatch();

  const resetShareState = useCallback(() => {
    dispatch(reset());
  }, [dispatch]);

  useEffect(() => {
    if (isShowingModal) {
      dispatch(setSharePackageId({ packageId }));
    }
  }, [packageId, dispatch, isShowingModal]);

  return (
    <AtlusModal isOpen={isShowingModal} onRequestClose={closeModal} onAfterClose={resetShareState}>
      <ShareBrokerPackageBody />
    </AtlusModal>
  );
};
