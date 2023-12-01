'use client';
import { PackageAccessValue } from '@/models/package-access-value';
import {
  AtlusDropdownList,
  DropdownOption,
  ValueOptionType,
} from '@/components/ui/dropdown-list/atlus-dropdown-list';
import clsx from 'clsx';
import { useMemo } from 'react';

interface PackageAccessDropdownProps {
  packageAccessValue: PackageAccessValue;
  className?: string;
  onChangeAccessSelected: (access: PackageAccessValue) => void;
  isLoading: boolean;
}

const packageAccessDropdownOptions: DropdownOption<PackageAccessValue>[] = [
  {
    label: 'Full',
    value: PackageAccessValue.FullAccess,
  },
  {
    label: 'Limited',
    value: PackageAccessValue.LimitedAccess,
  },
  {
    label: 'Remove access',
    value: PackageAccessValue.NoAccess,
  },
];

export const PackageAccessDropdown = ({
  packageAccessValue,
  className,
  onChangeAccessSelected,
  isLoading,
}: PackageAccessDropdownProps) => {
  const value = useMemo(() => {
    return packageAccessDropdownOptions.find(option => option.value === packageAccessValue);
  }, [packageAccessValue]);

  return (
    <AtlusDropdownList
      defaultValue={packageAccessValue}
      options={packageAccessDropdownOptions}
      value={value}
      onChange={onChangeAccessSelected}
      showDropdownIndicator={true}
      wrapperClassName={clsx('w-[170px]', className)}
      isLoading={isLoading}
      isDisabled={isLoading}
    />
  );
};
