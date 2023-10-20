import { DropdownOption } from '@/components/ui/dropdown-list/atlus-dropdown-list';
import { DropdownLabelWithIcon } from '@/components/ui/dropdown-list/dropdown-label-with-icon';
import { HiOutlineEye, HiOutlineLockClosed } from 'react-icons/hi2';

export enum Visibility {
  Public = 1,
  Private = 0,
}

export const dropdownPrivateOption: Readonly<DropdownOption<Visibility>> = {
  label: <DropdownLabelWithIcon label="Private" icon={<HiOutlineLockClosed size={16} />} />,
  value: Visibility.Private,
};

export const dropdownPublicOption: Readonly<DropdownOption<Visibility>> = {
  label: <DropdownLabelWithIcon label="Public" icon={<HiOutlineEye size={16} />} />,
  value: Visibility.Public,
};

export const visibilityOptions: Readonly<DropdownOption<Visibility>[]> = [
  dropdownPublicOption,
  dropdownPrivateOption,
];
