import { Timezone, timezones } from '@/components/common/timezones/timezones';
import { DropdownOption } from '@/components/ui/dropdown-list/atlus-dropdown-list';

export const timezoneOptions: DropdownOption<Timezone>[] = timezones.map(timezone => ({
  label: timezone,
  value: timezone,
}));
