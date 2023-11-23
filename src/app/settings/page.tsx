import { SettingsTitle } from '@/app/settings/components/settings-title';
import { UserSettings } from '@/app/settings/components/user-settings';

export default async function SettingsPage() {
  return (
    <div className="flex justify-center">
      <div className="max-w-[460px] w-full">
        <SettingsTitle title="Settings" />
        <UserSettings />
      </div>
    </div>
  );
}
