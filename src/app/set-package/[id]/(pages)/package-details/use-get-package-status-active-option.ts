import { useState } from 'react';
import { DropdownOption } from '@/components/ui/dropdown-list/atlus-dropdown-list';
import { PackageStatus } from '@/models/package-status';
import { useWatch } from 'react-hook-form';
import { IPackageDetailsForm } from '@/app/set-package/[id]/(pages)/package-details/package-details-form';
import { getDropdownOptions } from '@/components/ui/dropdown-list/dropdown.utils';
import { packageStatusOptions } from '@/components/common/dropdown/package-status-options';

export const useGetPackageStatusActiveOption = () => {
  const [currentStatusOption, setCurrentStatusOption] = useState<
    DropdownOption<PackageStatus> | undefined
  >();
  const formPackageStatus = useWatch<IPackageDetailsForm>({ name: 'status' });

  if (formPackageStatus !== currentStatusOption?.value) {
    const dropdownOptions = getDropdownOptions<PackageStatus>(
      packageStatusOptions,
      formPackageStatus as PackageStatus
    );
    if (dropdownOptions) {
      setCurrentStatusOption(dropdownOptions[0]);
    }
  }

  return currentStatusOption;
};
