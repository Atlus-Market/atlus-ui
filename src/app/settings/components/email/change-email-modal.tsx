import { AtlusModal } from '@/components/ui/modal/atlus-modal';
import { AtlusModalContainer } from '@/components/ui/modal/container/atlus-modal-container';
import { AtlusModalHeader } from '@/components/ui/modal/atlus-modal-header';
import { AtlusCloseModalButton } from '@/components/ui/modal/atlus-close-modal-button';
import { AtlusModalTitle } from '@/components/ui/modal/atlus-modal-title';
import { AtlusModalBody } from '@/components/ui/modal/atlus-modal-body';

interface ChangeEmailModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
}

export const ChangeEmailModal = ({ isModalOpen, closeModal }: ChangeEmailModalProps) => {
  return (
    <AtlusModal
      isOpen={isModalOpen}
      overlayClassName="z-[2]"
      onRequestClose={closeModal}
      modalBodyClassName=""
    >
      <AtlusModalContainer
        header={
          <AtlusModalHeader rightContent={<AtlusCloseModalButton onClick={closeModal} />}>
            <AtlusModalTitle text="Change email address" />
          </AtlusModalHeader>
        }
      >
        <AtlusModalBody>body</AtlusModalBody>
      </AtlusModalContainer>
    </AtlusModal>
  );
};
