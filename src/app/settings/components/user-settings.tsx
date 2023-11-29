'use client';

import { useAtlusUser } from '@/app/(auth)/session/use-atlus-user';
import { AtlusSplashLoader } from '@/components/ui/splash-loader/atlus-splash-loader';
import dynamic from 'next/dynamic';
import { DropdownOption } from '@/components/ui/dropdown-list/atlus-dropdown-list';

const BrokerSettingsForm = dynamic(() =>
  import('@/app/settings/components/broker/broker-settings-form').then(m => m.BrokerSettingsForm)
);

const BuyerSettingsForm = dynamic(() =>
  import('@/app/settings/components/buyer/buyer-settings-form').then(m => m.BuyerSettingsForm)
);

interface UserSettingsProps {
  timezonesOptions: DropdownOption<string>[];
}

export const UserSettings = ({ timezonesOptions }: UserSettingsProps) => {
  const { data: user } = useAtlusUser();

  if (!user) {
    return <AtlusSplashLoader />;
  }

  if (user.broker) {
    return <BrokerSettingsForm user={user} timezonesOptions={timezonesOptions} />;
  } else {
    return <BuyerSettingsForm user={user} timezonesOptions={timezonesOptions} />;
  }
};
