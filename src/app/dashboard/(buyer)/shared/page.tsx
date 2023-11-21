import { BuyerLayoutTabs } from '@/app/dashboard/(buyer)/buyer-layout-tabs';
import { BuyerDashboardShared } from '@/constants/routes';
import { getSharedPackagesOnServer } from '@/api/package/access/get-shared-packages-on-server';
import { BuyerPackagesList } from '@/app/dashboard/(buyer)/components/buyer-packages-list';
import { NoSharedData } from '@/app/dashboard/(buyer)/shared/components/no-shared-data';

export default async function DashboardSharedPage() {
  const packages = await getSharedPackagesOnServer();
  const hasPackages = packages.length > 0;
  return (
    <div>
      <BuyerLayoutTabs activePathname={BuyerDashboardShared} />
      {hasPackages ? <BuyerPackagesList packages={packages} /> : <NoSharedData />}
    </div>
  );
}
