import { BuyerLayoutTabs } from '@/app/(protected-routes)/dashboard/(buyer)/buyer-layout-tabs';
import { BuyerDashboardRecommended } from '@/constants/routes';
import { NoRecommendedData } from '@/app/(protected-routes)/dashboard/(buyer)/recommended/components/no-recommended-data';
import { getRecommendedPackagesOnServer } from '@/api/package/get-recommended-packages-on-server';
import { BuyerPackagesList } from '@/app/(protected-routes)/dashboard/(buyer)/components/buyer-packages-list';

export default async function DashboardRecommendedPage() {
  const packages = await getRecommendedPackagesOnServer();

  const hasPackages = packages?.length > 0;
  return (
    <div>
      <BuyerLayoutTabs activePathname={BuyerDashboardRecommended} />
      {hasPackages ? <BuyerPackagesList packages={packages} /> : <NoRecommendedData />}
    </div>
  );
}
