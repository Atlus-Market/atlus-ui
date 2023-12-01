'use client';

import { RequestPackagePermissionTitle } from '@/app/(main)/package/[id]/components/limited-access/common/request-package-permission-title';
import { RequestPackagePermissionSubtitle } from '@/app/(main)/package/[id]/components/limited-access/common/request-package-permission-subtitle';
import { AtlusButton } from '@/components/ui/button/atlus-button';
import { useRequestPackagePermission } from '@/app/(main)/package/[id]/components/limited-access/request-permission/use-request-package-permission';
import { useCallback, useState } from 'react';
import Link from 'next/link';
import { object, ObjectSchema, string } from 'yup';
import { AtlusFormTextarea } from '@/components/ui/form/atlus-form-textarea';
import { AtlusForm } from '@/components/ui/form/atlus-form';
import { useAtlusForm } from '@/components/ui/form/use-atlus-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams } from 'next/navigation';
import { PackagePageProps } from '@/app/(main)/package/[id]/page';

interface RequestPackagePermissionForm {
  message: string;
}

const schema: ObjectSchema<RequestPackagePermissionForm> = object({
  message: string().trim().optional().default(''),
});

export const RequestPackagePermission = () => {
  const params = useParams<PackagePageProps['params']>();
  const [hasRequestedPermissionSuccessfully, setHasRequestedPermissionSuccessfully] =
    useState<boolean>(false);
  const { isLoading, mutateAsync } = useRequestPackagePermission({ packageId: params.id });
  const formProps = useAtlusForm<RequestPackagePermissionForm>({
    formOptions: {
      resolver: yupResolver(schema),
    },
  });

  const requestPackageAccess = useCallback(
    async ({ message }: RequestPackagePermissionForm) => {
      try {
        await mutateAsync(message);
        setHasRequestedPermissionSuccessfully(true);
      } catch (e) {}
    },
    [mutateAsync]
  );

  if (!hasRequestedPermissionSuccessfully) {
    return (
      <div className="max-w-[480px] my0 mx-auto">
        <RequestPackagePermissionTitle text="You need permission to view this package" />
        <RequestPackagePermissionSubtitle content="Request access from the package broker." />
        <AtlusForm formProps={formProps} onSubmit={requestPackageAccess}>
          <AtlusFormTextarea
            textAreaClassName="!min-h-[94px] md:!min-h-[119px]"
            placeholder="Write a message (Optional)"
            {...formProps.register('message')}
            wrapperClassName="!mb-6 md:!mb-8"
          />
          <AtlusButton variant="outline" color="orange" isLoading={isLoading} type="submit">
            Request access
          </AtlusButton>
        </AtlusForm>
      </div>
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
