import { BuyerLayoutTabs } from '@/app/dashboard/(buyer)/buyer-layout-tabs';
import { BuyerDashboardRecommended } from '@/constants/routes';
import { NoRecommendedData } from '@/app/dashboard/(buyer)/recommended/components/no-recommended-data';

export default async function DashboardRecommendedPage() {
  return (
    <div>
      <BuyerLayoutTabs activePathname={BuyerDashboardRecommended} />
      <NoRecommendedData />
    </div>
  );
}
