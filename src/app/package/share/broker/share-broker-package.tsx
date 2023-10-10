'use client';

import { AtlusModal } from '@/components/ui/modal/atlus-modal';
import { ShareBrokerPackageBody } from '@/app/package/share/broker/share-broker-package-body';
import { useCallback } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { reset } from '@/redux/features/share-package/share-package';

interface ShareBrokerPackageProps {
  isShowingModal?: boolean;
  closeModal?: () => void;
}

export const ShareBrokerPackage = ({
  isShowingModal = false,
  closeModal,
}: ShareBrokerPackageProps) => {
  const dispatch = useAppDispatch();

  const resetShareState = useCallback(() => {
    dispatch(reset());
  }, [dispatch]);

  return (
    <AtlusModal isOpen={isShowingModal} onRequestClose={closeModal} onAfterClose={resetShareState}>
      <ShareBrokerPackageBody />
    </AtlusModal>
  );
};
