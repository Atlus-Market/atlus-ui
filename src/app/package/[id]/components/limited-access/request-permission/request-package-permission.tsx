'use client';

import { RequestPackagePermissionTitle } from '@/app/package/[id]/components/limited-access/common/request-package-permission-title';
import { RequestPackagePermissionSubtitle } from '@/app/package/[id]/components/limited-access/common/request-package-permission-subtitle';
import { AtlusButton } from '@/components/ui/button/atlus-button';
import { useRequestPackagePermission } from '@/app/package/[id]/components/limited-access/request-permission/use-request-package-permission';
import { useCallback, useState } from 'react';
import Link from 'next/link';

export const RequestPackagePermission = () => {
  const [hasRequestedPermissionSuccessfully, setHasRequestedPermissionSuccessfully] =
    useState<boolean>(false);
  const { isLoading, mutateAsync } = useRequestPackagePermission({ packageId: '' });

  const requestPackageAccess = useCallback(async () => {
    try {
      await mutateAsync();
      setHasRequestedPermissionSuccessfully(true);
    } catch (e) {}
  }, [mutateAsync]);

  if (!hasRequestedPermissionSuccessfully) {
    return (
      <>
        <RequestPackagePermissionTitle text="You need permission to view this package" />
        <RequestPackagePermissionSubtitle content="Request access from the package broker." />
        <AtlusButton
          variant="outline"
          color="orange"
          isLoading={isLoading}
          onClick={requestPackageAccess}
        >
          Request access
        </AtlusButton>
      </>
    );
  }

  return (
    <>
      <RequestPackagePermissionTitle text="Your request has been sent!" />
      <RequestPackagePermissionSubtitle content="We’ll send you an email notification once you have access to this package." />
      <Link href="/">
        <AtlusButton variant="clear" color="orange">
          Return to dashboard
        </AtlusButton>
      </Link>
    </>
  );
};
