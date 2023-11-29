import { SettingsTitle } from '@/app/settings/components/settings-title';
import { UserSettings } from '@/app/settings/components/user-settings';
import { getTimezones } from '@/api/timezones/get-timezones';
import { DropdownOption } from '@/components/ui/dropdown-list/atlus-dropdown-list';
import { createTimezonesDropdownOptions } from '@/components/common/timezones/timezones.utils';

export default async function SettingsPage() {
  const timezonesOptions: DropdownOption<string>[] = createTimezonesDropdownOptions(
    await getTimezones()
  );

  return (
    <div className="flex justify-center">
      <div className="max-w-[460px] w-full">
        <SettingsTitle title="Settings" />
        <UserSettings timezonesOptions={timezonesOptions} />
      </div>
    </div>
  );
}
