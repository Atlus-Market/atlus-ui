'use client';

import { User } from '@/models/user';
import { AtlusModal } from '@/components/ui/modal/atlus-modal';
import { AtlusModalContainer } from '@/components/ui/modal/container/atlus-modal-container';
import { AtlusModalHeader } from '@/components/ui/modal/atlus-modal-header';
import { AtlusCloseModalButton } from '@/components/ui/modal/atlus-close-modal-button';
import { AtlusModalBody } from '@/components/ui/modal/atlus-modal-body';
import { UserProfileBody } from '@/app/user/user-profile-modal/user-profile-body';

interface UserProfileModalProps {
  user: User;
  isModalOpen: boolean;
  onCloseModal: () => void;
}

export const UserProfileModal = ({ user, isModalOpen, onCloseModal }: UserProfileModalProps) => {
  return (
    <AtlusModal isOpen={isModalOpen} modalBodyClassName="!h-auto" onRequestClose={onCloseModal}>
      <AtlusModalContainer
        className="sm:max-md:!w-[360px]"
        header={
          <AtlusModalHeader
            rightContent={<AtlusCloseModalButton onClick={onCloseModal} />}
          ></AtlusModalHeader>
        }
      >
        <AtlusModalBody className="md:w-[540px]">
          <UserProfileBody user={user} />
        </AtlusModalBody>
      </AtlusModalContainer>
    </AtlusModal>
  );
};
