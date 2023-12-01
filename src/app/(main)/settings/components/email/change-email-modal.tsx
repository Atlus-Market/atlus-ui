import { AtlusModal } from '@/components/ui/modal/atlus-modal';
import { ChangeEmailBody } from '@/app/(main)/settings/components/email/change-email-body';

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
      modalBodyClassName="!w-[360px] md:!w-[540px] !h-auto"
    >
      <ChangeEmailBody onCloseModal={closeModal} />
    </AtlusModal>
  );
};
