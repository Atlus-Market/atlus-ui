import { DropdownOption } from '@/components/ui/dropdown-list/atlus-dropdown-list';
import { DropdownLabelWithIcon } from '@/components/ui/dropdown-list/dropdown-label-with-icon';
import { HiOutlineEye, HiOutlineLockClosed } from 'react-icons/hi2';

export const dropdownPrivateOption: Readonly<DropdownOption> = {
  label: <DropdownLabelWithIcon
    label='Private'
    icon={<HiOutlineLockClosed size={16} />}
  />,
  value: 'private'
};

export const dropdownPublicOption: Readonly<DropdownOption> = {
  label: <DropdownLabelWithIcon
    label='Public'
    icon={<HiOutlineEye size={16} />}
  />,
  value: 'public'
};

export const visibilityOptions: Readonly<DropdownOption[]> = [
  dropdownPublicOption,
  dropdownPrivateOption
];


