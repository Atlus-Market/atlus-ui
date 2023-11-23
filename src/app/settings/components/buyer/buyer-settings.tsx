'use client';

import { SettingsTitle } from '@/app/settings/components/settings-title';
import { BuyerSettingsForm } from '@/app/settings/components/buyer/buyer-settings-form';
import { useAtlusUser } from '@/app/(auth)/session/use-atlus-user';
import { AtlusSplashLoader } from '@/components/ui/splash-loader/atlus-splash-loader';
import { ChangeEmailModal } from '@/app/settings/components/email/change-email-modal';
import { useToggleState } from '@/hooks/use-toggle-state';
import { ChangePasswordModal } from '@/app/settings/components/change-password/change-password-modal';

interface BuyerSettingsProps {}

export const BuyerSettings = ({}: BuyerSettingsProps) => {
  const { data: user } = useAtlusUser();
  const {
    isOn: isChangeEmailModalOpen,
    setOn: showChangeEmailModal,
    setOff: hideChangeEmailModal,
  } = useToggleState(false);

  const {
    isOn: isChangePwdModalOpen,
    setOn: showChangePwdModal,
    setOff: hideChangePwdModal,
  } = useToggleState(false);

  if (!user) {
    return <AtlusSplashLoader />;
  }

  return (
    <div className="max-w-[460px]">
      <SettingsTitle title="Settings" />
      <BuyerSettingsForm
        user={user}
        showChangeEmailModal={showChangeEmailModal}
        showChangePwdModal={showChangePwdModal}
      />
      <ChangeEmailModal isModalOpen={isChangeEmailModalOpen} closeModal={hideChangeEmailModal} />
      <ChangePasswordModal isModalOpen={isChangePwdModalOpen} closeModal={hideChangePwdModal} />
    </div>
  );
};
