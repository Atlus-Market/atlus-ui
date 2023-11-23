'use client';

import { ChangePasswordModal } from '@/app/settings/components/change-password/change-password-modal';
import { useToggleState } from '@/hooks/use-toggle-state';
import { AtlusFormLabel } from '@/components/ui/form/atlus-form-label';
import { ChangeLink } from '@/app/settings/components/change-link';

export const ChangePasswordFormField = () => {
  const {
    isOn: isChangePwdModalOpen,
    setOn: showChangePwdModal,
    setOff: hideChangePwdModal,
  } = useToggleState(false);

  return (
    <>
      <ChangePasswordModal isModalOpen={isChangePwdModalOpen} closeModal={hideChangePwdModal} />
      <div className="flex justify-between items-center mb-4 md:mb-6">
        <div>
          <AtlusFormLabel label="Password" />
          <span className="block text-soft-black text-sm md:text-base leading-normal">
            ************
          </span>
        </div>
        <ChangeLink changePartText="password" onClick={showChangePwdModal} />
      </div>
    </>
  );
};
