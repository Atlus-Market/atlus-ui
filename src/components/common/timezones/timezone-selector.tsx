import {
  AtlusFormDropdownList,
  AtlusFormDropdownListProps,
} from '@/components/ui/form/atlus-form-dropdown';
import { DropdownOption } from '@/components/ui/dropdown-list/atlus-dropdown-list';

interface TimezoneSelectorProps extends AtlusFormDropdownListProps<string> {
  timezoneOptions: DropdownOption<string>[];
}

export const TimezonesDropdownForm = ({ timezoneOptions, ...rest }: TimezoneSelectorProps) => {
  return (
    <AtlusFormDropdownList
      {...rest}
      options={timezoneOptions}
      showDropdownIndicator={true}
      isSearchable={true}
      placeholder="Time zone"
    />
  );
};
