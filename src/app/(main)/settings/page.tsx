import { SettingsTitle } from '@/app/(main)/settings/components/settings-title';
import { UserSettings } from '@/app/(main)/settings/components/user-settings';

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
