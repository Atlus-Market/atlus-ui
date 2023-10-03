'use client';

import { AtlusModal } from '@/components/ui/modal/atlus-modal';
import { AtlusModalContainer } from '@/components/ui/modal/container/atlus-modal-container';
import { AtlusModalHeader } from '@/components/ui/modal/atlus-modal-header';
import { AtlusCloseModalButton } from '@/components/ui/modal/atlus-close-modal-button';
import { AtlusModalTitle } from '@/components/ui/modal/atlus-modal-title';
import { AtlusModalFooter } from '@/components/ui/modal/atlus-modal-footer';
import { AtlusModalBody } from '@/components/ui/modal/atlus-modal-body';
import { SharePackageFooter } from '@/app/package/share/commom/share-package-footer';
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

  const onClose = useCallback(() => {
    closeModal?.();
    dispatch(reset());
  }, [closeModal, dispatch]);

  return (
    <AtlusModal isOpen={isShowingModal} onRequestClose={onClose}>
      <AtlusModalContainer
        header={
          <AtlusModalHeader rightContent={<AtlusCloseModalButton onClick={onClose} />}>
            <AtlusModalTitle text="Share package" />
          </AtlusModalHeader>
        }
        footer={
          <AtlusModalFooter className="bg-lightest-grey">
            <SharePackageFooter />
          </AtlusModalFooter>
        }
      >
        <AtlusModalBody className="md:w-[540px] !py-0">
          <ShareBrokerPackageBody />
        </AtlusModalBody>
      </AtlusModalContainer>
    </AtlusModal>
  );
};
