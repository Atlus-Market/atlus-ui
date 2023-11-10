import { BuyerLayoutTabs } from '@/app/dashboard/(buyer)/buyer-layout-tabs';
import { BuyerDashboardRecommended } from '@/constants/routes';
import { NoRecommendedData } from '@/app/dashboard/(buyer)/recommended/components/no-recommended-data';
import { getRecommendedPackagesOnServer } from '@/api/package/get-recommended-packages-on-server';

export default async function DashboardRecommendedPage() {
  const p = await getRecommendedPackagesOnServer();
  console.log(p);

  const hasPackages = p.length > 0;
  return (
    <div>
      <BuyerLayoutTabs activePathname={BuyerDashboardRecommended} />
      {hasPackages ? `Packages: ${p.length}` : <NoRecommendedData />}
    </div>
  );
}
