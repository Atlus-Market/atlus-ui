import { AtlusModal } from '@/components/ui/modal/atlus-modal';
import { AtlusModalContainer } from '@/components/ui/modal/container/atlus-modal-container';
import { AtlusModalHeader } from '@/components/ui/modal/atlus-modal-header';
import { AtlusCloseModalButton } from '@/components/ui/modal/atlus-close-modal-button';
import { AtlusModalTitle } from '@/components/ui/modal/atlus-modal-title';
import { AtlusModalFooter } from '@/components/ui/modal/atlus-modal-footer';
import { AtlusModalBody } from '@/components/ui/modal/atlus-modal-body';

interface ShareBrokerPackageProps {
  isShowingModal?: boolean;
  closeModal?: () => void;
}

export const ShareBrokerPackage = ({
  isShowingModal = false,
  closeModal,
}: ShareBrokerPackageProps) => {
  return (
    <AtlusModal isOpen={isShowingModal}>
      <AtlusModalContainer
        header={
          <AtlusModalHeader rightContent={<AtlusCloseModalButton onClick={closeModal} />}>
            <AtlusModalTitle text="Share package" />
          </AtlusModalHeader>
        }
        footer={
          <AtlusModalFooter>
            <div>footer</div>
          </AtlusModalFooter>
        }
      >
        <AtlusModalBody className="w-[650px] !py-0">
          <div>Body</div>
        </AtlusModalBody>
      </AtlusModalContainer>
    </AtlusModal>
  );
};
