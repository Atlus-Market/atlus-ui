import { BuyerLayoutTabs } from '@/app/dashboard/(buyer)/buyer-layout-tabs';
import { BuyerDashboardShared, BuyerDashboardWatchlist } from '@/constants/routes';

export default async function DashboardWatchlistPage() {
  return (
    <div>
      <BuyerLayoutTabs activePathname={BuyerDashboardWatchlist} />
      Dashboard watchlist page
    </div>
  );
}
