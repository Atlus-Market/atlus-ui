import { AtlusModal } from '@/components/ui/modal/atlus-modal';
import { ChangePasswordBody } from '@/app/(main)/settings/components/change-password/change-password-body';

interface ChangePasswordModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
}

export const ChangePasswordModal = ({ isModalOpen, closeModal }: ChangePasswordModalProps) => {
  return (
    <AtlusModal isOpen={isModalOpen} overlayClassName="z-[2]" onRequestClose={closeModal}>
      <ChangePasswordBody onCloseModal={closeModal} />
    </AtlusModal>
  );
};
