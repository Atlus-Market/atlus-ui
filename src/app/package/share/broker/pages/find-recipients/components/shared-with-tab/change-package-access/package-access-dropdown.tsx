'use client';
import { PackageAccessValue } from '@/models/package-access-value';
import {
  AtlusDropdownList,
  DropdownOption,
} from '@/components/ui/dropdown-list/atlus-dropdown-list';
import clsx from 'clsx';

interface PackageAccessDropdownProps {
  packageAccessValue: PackageAccessValue;
  className?: string;
  onAccessSelected: (access: PackageAccessValue) => void;
}

const packageAccessDropdownOptions: DropdownOption[] = [
  {
    label: 'Full',
    value: PackageAccessValue.FullAccess.toString(),
  },
  {
    label: 'Limited',
    value: PackageAccessValue.LimitedAccess.toString(),
  },
  {
    label: 'Remove access',
    value: PackageAccessValue.NoAccess.toString(),
  },
];

export const PackageAccessDropdown = ({
  packageAccessValue,
  className,
  onAccessSelected,
}: PackageAccessDropdownProps) => {
  return (
    <AtlusDropdownList
      defaultValue={packageAccessValue?.toString()}
      options={packageAccessDropdownOptions}
      onChange={(value: string | string[]) => {
        console.log('option: ', value);
        onAccessSelected(parseInt(value as string, 10));
      }}
      showDropdownIndicator={true}
      wrapperClassName={clsx('w-[170px]', className)}
    />
  );
};
