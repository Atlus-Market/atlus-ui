'use client';

import { useToggleState } from '@/hooks/use-toggle-state';
import { ConfirmDeleteAccount } from '@/app/settings/components/delete-account/confirm-delete-account';

export const DeleteAccount = () => {
  const {
    isOn: isConfirmModalOpen,
    setOn: showConfirmModal,
    setOff: hideConfirmModal,
  } = useToggleState();
  return (
    <div>
      <ConfirmDeleteAccount isModalOpen={isConfirmModalOpen} hideModal={hideConfirmModal} />
      <a href="#" onClick={showConfirmModal}>
        <span className="text-red leading-5 font-medium text-sm md:text-base">Delete account</span>
      </a>
    </div>
  );
};
