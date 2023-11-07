import { BuyerLayoutTabs } from '@/app/dashboard/(buyer)/buyer-layout-tabs';
import { BuyerDashboardWatchlist } from '@/constants/routes';
import { NoWatchlistData } from '@/app/dashboard/(buyer)/watchlist/components/no-watchlist-data';

export default async function DashboardWatchlistPage() {
  return (
    <div>
      <BuyerLayoutTabs activePathname={BuyerDashboardWatchlist} />
      <NoWatchlistData />
    </div>
  );
}
