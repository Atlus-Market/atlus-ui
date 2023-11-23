import { AtlusModal } from '@/components/ui/modal/atlus-modal';
import { ChangePasswordBody } from '@/app/settings/components/change-password/change-password-body';

interface ChangePasswordModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
}

export const ChangePasswordModal = ({ isModalOpen, closeModal }: ChangePasswordModalProps) => {
  return (
    <AtlusModal
      isOpen={isModalOpen}
      overlayClassName="z-[2]"
      onRequestClose={closeModal}
      modalBodyClassName="!w-[360px] md:!w-[540px] !h-auto"
    >
      <ChangePasswordBody onCloseModal={closeModal} />
    </AtlusModal>
  );
};
