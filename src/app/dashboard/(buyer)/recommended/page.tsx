import { BuyerLayoutTabs } from '@/app/dashboard/(buyer)/buyer-layout-tabs';
import { BuyerDashboardRecommended } from '@/constants/routes';
import { NoRecommendedData } from '@/app/dashboard/(buyer)/recommended/components/no-recommended-data';
import { getRecommendedPackagesOnServer } from '@/api/package/get-recommended-packages-on-server';
import { BuyerPackagesList } from '@/app/dashboard/(buyer)/components/buyer-packages-list';

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
