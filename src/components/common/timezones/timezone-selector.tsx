import {
  AtlusFormDropdownList,
  AtlusFormDropdownListProps,
} from '@/components/ui/form/atlus-form-dropdown';
import { timezoneOptions } from '@/components/common/timezones/timezone-options';
import { Timezone } from '@/components/common/timezones/timezones';

type TimezoneSelectorProps = AtlusFormDropdownListProps<Timezone>;

export const TimezonesDropdownForm = (props: TimezoneSelectorProps) => {
  return (
    <AtlusFormDropdownList
      {...props}
      options={timezoneOptions}
      showDropdownIndicator={true}
      isSearchable={true}
      placeholder="Time zone"
    />
  );
};
