import { LimitedAccessFooter } from '@/app/(protected-routes)/package/[id]/components/limited-access/limited-access-footer';
import { RequestPackagePermission } from '@/app/(protected-routes)/package/[id]/components/limited-access/request-permission/request-package-permission';

export const NoPackagePermission = () => {
  return (
    <LimitedAccessFooter>
      <RequestPackagePermission />
    </LimitedAccessFooter>
  );
};
