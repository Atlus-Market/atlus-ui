import { DropdownOption } from '@/components/ui/dropdown-list/atlus-dropdown-list';

export enum YesNoOptions {
  Yes = 'true',
  No = 'false',
}

export const dropdownNoOption: Readonly<DropdownOption> = {
  label: 'No',
  value: YesNoOptions.No,
};

export const dropdownYesOption: Readonly<DropdownOption> = {
  label: 'Yes',
  value: YesNoOptions.Yes,
};

export const yesNoOptions: Readonly<DropdownOption[]> = [dropdownYesOption, dropdownNoOption];
