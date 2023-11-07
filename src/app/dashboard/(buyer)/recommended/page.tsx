import { BuyerLayoutTabs } from '@/app/dashboard/(buyer)/buyer-layout-tabs';
import { BuyerDashboardRecommended } from '@/constants/routes';
import SearchItemSVG from '@/public/assets/images/search_item.svg';
import { NoData } from '@/app/dashboard/components/no-data';

export default async function DashboardRecommendedPage() {
  return (
    <div>
      <BuyerLayoutTabs activePathname={BuyerDashboardRecommended} />
      <NoData
        image={SearchItemSVG}
        subtitle={<span className="text-dark-grey">No packages match your interests yet</span>}
      />
    </div>
  );
}
