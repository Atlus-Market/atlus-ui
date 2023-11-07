import { BuyerLayoutTabs } from '@/app/dashboard/(buyer)/buyer-layout-tabs';
import { BuyerDashboardShared } from '@/constants/routes';

export default async function DashboardSharedPage() {
  return (
    <div>
      <BuyerLayoutTabs activePathname={BuyerDashboardShared} />
      Dashboard shared page
    </div>
  );
}
