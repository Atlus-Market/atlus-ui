import { Timezones } from '@/models/timezones';
import { DropdownOption } from '@/components/ui/dropdown-list/atlus-dropdown-list';

export const createTimezonesDropdownOptions = (timezones: Timezones): DropdownOption<string>[] => {
  return Object.keys(timezones).map(city => ({
    label: timezones[city],
    value: timezones[city],
  }));
};
