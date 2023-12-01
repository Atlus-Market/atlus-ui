'use client';
import { AtlusFormLabel } from '@/components/ui/form/atlus-form-label';
import { ChangeLink } from '@/app/(main)/settings/components/change-link';
import { useToggleState } from '@/hooks/use-toggle-state';
import { ChangeEmailModal } from '@/app/(main)/settings/components/email/change-email-modal';

interface ChangeEmailFormFieldProps {
  email: string;
}

export const ChangeEmailFormField = ({ email }: ChangeEmailFormFieldProps) => {
  const {
    isOn: isChangeEmailModalOpen,
    setOn: showChangeEmailModal,
    setOff: hideChangeEmailModal,
  } = useToggleState(false);

  return (
    <>
      <ChangeEmailModal isModalOpen={isChangeEmailModalOpen} closeModal={hideChangeEmailModal} />
      <div className="flex justify-between items-center mb-4 md:mb-6">
        <div>
          <AtlusFormLabel label="Email" />
          <span className="block text-soft-black text-sm md:text-base leading-normal">{email}</span>
        </div>
        <ChangeLink changePartText="email" onClick={showChangeEmailModal} />
      </div>
    </>
  );
};
