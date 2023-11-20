import { SettingsTitle } from '@/app/settings/components/settings-title';
import { User } from '@/models/user';
import { BuyerSettingsForm } from '@/app/settings/components/buyer/buyer-settings-form';

interface BuyerSettingsProps {
  user: User;
}

export const BuyerSettings = ({ user }: BuyerSettingsProps) => {
  return (
    <div className="max-w-[460px]">
      <SettingsTitle title="Settings" />
      <BuyerSettingsForm user={user} />
      <a className="text-orange">Delete account</a>
    </div>
  );
};
