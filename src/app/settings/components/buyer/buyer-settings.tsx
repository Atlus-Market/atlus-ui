'use client';

import { SettingsTitle } from '@/app/settings/components/settings-title';
import { BuyerSettingsForm } from '@/app/settings/components/buyer/buyer-settings-form';
import { useAtlusUser } from '@/app/(auth)/session/use-atlus-user';
import { AtlusSplashLoader } from '@/components/ui/splash-loader/atlus-splash-loader';

interface BuyerSettingsProps {}

export const BuyerSettings = ({}: BuyerSettingsProps) => {
  const { data: user } = useAtlusUser();

  if (!user) {
    return <AtlusSplashLoader />;
  }

  return (
    <div className="max-w-[460px]">
      <SettingsTitle title="Settings" />
      <BuyerSettingsForm user={user} />
    </div>
  );
};
