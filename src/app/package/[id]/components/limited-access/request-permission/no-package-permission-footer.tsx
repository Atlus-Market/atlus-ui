import { LimitedAccessFooter } from '@/app/package/[id]/components/limited-access/limited-access-footer';
import { RequestPackagePermission } from '@/app/package/[id]/components/limited-access/request-permission/request-package-permission';

export const NoPackagePermissionFooter = () => {
  return (
    <LimitedAccessFooter>
      <RequestPackagePermission />
    </LimitedAccessFooter>
  );
};
