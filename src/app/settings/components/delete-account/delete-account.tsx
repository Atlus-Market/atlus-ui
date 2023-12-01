'use client';

import { useToggleState } from '@/hooks/use-toggle-state';
import { ConfirmDeleteAccount } from '@/app/settings/components/delete-account/confirm-delete-account';
import { useRequestDeleteAccount } from '@/hooks/data/use-request-delete-account';
import { useCallback } from 'react';
import { showSuccessNotification } from '@/components/ui/notification/atlus-notification';

export const DeleteAccount = () => {
  const {
    isOn: isConfirmModalOpen,
    setOn: showConfirmModal,
    setOff: hideConfirmModal,
  } = useToggleState();
  const { mutateAsync, isLoading } = useRequestDeleteAccount();

  const confirmDeleteAccount = useCallback(async () => {
    await mutateAsync();
    hideConfirmModal();
    showSuccessNotification({ text: 'Account deleting requested successfully!' });
  }, [hideConfirmModal, mutateAsync]);

  return (
    <div>
      <ConfirmDeleteAccount
        isModalOpen={isConfirmModalOpen}
        hideModal={hideConfirmModal}
        onConfirmDeleteAccount={confirmDeleteAccount}
        isRequestingDelete={isLoading}
      />
      <a href="#" onClick={showConfirmModal}>
        <span className="text-red leading-5 font-medium text-sm md:text-base">Delete account</span>
      </a>
    </div>
  );
};
