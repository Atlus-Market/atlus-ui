'use client';
import { PackageAccessValue } from '@/models/package-access-value';
import {
  AtlusDropdownList,
  DropdownOption,
} from '@/components/ui/dropdown-list/atlus-dropdown-list';
import clsx from 'clsx';
import { useMemo } from 'react';

interface PackageAccessDropdownProps {
  packageAccessValue: PackageAccessValue;
  className?: string;
  onChangeAccessSelected: (access: PackageAccessValue) => void;
  isLoading: boolean;
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
  onChangeAccessSelected,
  isLoading,
}: PackageAccessDropdownProps) => {
  const value = useMemo(() => {
    return packageAccessDropdownOptions.find(
      option => option.value === packageAccessValue.toString()
    );
  }, [packageAccessValue]);

  return (
    <AtlusDropdownList
      defaultValue={packageAccessValue?.toString()}
      options={packageAccessDropdownOptions}
      value={value}
      onChange={(value: string | string[]) => {
        onChangeAccessSelected(parseInt(value as string, 10));
      }}
      showDropdownIndicator={true}
      wrapperClassName={clsx('w-[170px]', className)}
      isLoading={isLoading}
      isDisabled={isLoading}
    />
  );
};
