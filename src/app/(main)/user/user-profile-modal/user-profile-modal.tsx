'use client';

import { User } from '@/models/user';
import { AtlusModal } from '@/components/ui/modal/atlus-modal';
import { AtlusModalContainer } from '@/components/ui/modal/container/atlus-modal-container';
import { AtlusModalHeader } from '@/components/ui/modal/atlus-modal-header';
import { AtlusCloseModalButton } from '@/components/ui/modal/atlus-close-modal-button';
import { AtlusModalBody } from '@/components/ui/modal/atlus-modal-body';
import { UserProfileBody } from '@/app/(main)/user/user-profile-modal/user-profile-body';

interface UserProfileModalProps {
  user: User;
  isModalOpen: boolean;
  onCloseModal: () => void;
}

export const UserProfileModal = ({ user, isModalOpen, onCloseModal }: UserProfileModalProps) => {
  return (
    <AtlusModal isOpen={isModalOpen} onRequestClose={onCloseModal}>
      <AtlusModalContainer
        header={
          <AtlusModalHeader
            rightContent={<AtlusCloseModalButton onClick={onCloseModal} />}
          ></AtlusModalHeader>
        }
      >
        <AtlusModalBody>
          <UserProfileBody user={user} />
        </AtlusModalBody>
      </AtlusModalContainer>
    </AtlusModal>
  );
};
