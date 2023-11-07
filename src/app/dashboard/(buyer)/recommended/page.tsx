import { BuyerLayoutTabs } from '@/app/dashboard/(buyer)/buyer-layout-tabs';
import { BuyerDashboardRecommended } from '@/constants/routes';

export default async function DashboardRecommendedPage() {
  return (
    <div>
      <BuyerLayoutTabs activePathname={BuyerDashboardRecommended} />
      Dashboard recommended page
    </div>
  );
}
