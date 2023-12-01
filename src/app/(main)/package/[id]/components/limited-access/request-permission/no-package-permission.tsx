import { LimitedAccessFooter } from '@/app/(main)/package/[id]/components/limited-access/limited-access-footer';
import { RequestPackagePermission } from '@/app/(main)/package/[id]/components/limited-access/request-permission/request-package-permission';

export const NoPackagePermission = () => {
  return (
    <LimitedAccessFooter>
      <RequestPackagePermission />
    </LimitedAccessFooter>
  );
};
