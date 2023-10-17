'use client';

import { User } from '@/models/user';
import { useToggleState } from '@/hooks/use-toggle-state';
import { UserProfileModal } from '@/app/user/user-profile-modal/user-profile-modal';

interface ViewOwnerModalProps {
  user: User;
}

export const ViewOwnerModal = ({ user }: ViewOwnerModalProps) => {
  const { isOn, setOn, setOff } = useToggleState();

  return (
    <>
      <div
        className="text-orange text-xs md:text-[13px] hover:cursor-pointer font-medium"
        onClick={setOn}
      >
        View contact details
      </div>
      <UserProfileModal user={user} isModalOpen={isOn} onCloseModal={setOff} />
    </>
  );
};
