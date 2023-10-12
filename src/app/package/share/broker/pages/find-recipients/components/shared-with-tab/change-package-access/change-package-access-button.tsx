'use client';

import { AtlusButton } from '@/components/ui/button/atlus-button';
import { HiDotsVertical } from 'react-icons/hi';
import { PackageAccessDropdown } from '@/app/package/share/broker/pages/find-recipients/components/shared-with-tab/change-package-access/package-access-dropdown';
import { PackageAccessValue } from '@/models/package-access-value';
import { useCallback } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { changePackageAccess } from '@/redux/features/share-package/thunks/change-package-access';

interface ChangePackageAccessButtonProps {
  packageAccessValue: PackageAccessValue;
  email: string;
}

export const ChangePackageAccessButton = ({
  packageAccessValue,
  email,
}: ChangePackageAccessButtonProps) => {
  const dispatch = useAppDispatch();

  const onAccessChanged = useCallback(
    (access: PackageAccessValue) => {
      // @ts-ignore
      dispatch(changePackageAccess({ email, access }));
    },
    [dispatch, email]
  );

  return (
    <>
      <PackageAccessDropdown
        // pass down isLoading
        packageAccessValue={packageAccessValue}
        className="hidden md:block"
        onAccessSelected={onAccessChanged}
      />
      <AtlusButton variant="clear" className="block md:hidden">
        <HiDotsVertical />
      </AtlusButton>
    </>
  );
};
