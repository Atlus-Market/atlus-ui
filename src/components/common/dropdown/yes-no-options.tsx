import { DropdownOption } from '@/components/ui/dropdown-list/atlus-dropdown-list';

export const dropdownNoOption: Readonly<DropdownOption<boolean>> = {
  label: 'No',
  value: false,
};

export const dropdownYesOption: Readonly<DropdownOption<boolean>> = {
  label: 'Yes',
  value: true,
};

export const yesNoOptions: Readonly<DropdownOption<boolean>[]> = [
  dropdownYesOption,
  dropdownNoOption,
];
