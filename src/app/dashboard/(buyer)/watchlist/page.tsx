import { BuyerLayoutTabs } from '@/app/dashboard/(buyer)/buyer-layout-tabs';
import { BuyerDashboardWatchlist } from '@/constants/routes';
import { NoWatchlistData } from '@/app/dashboard/(buyer)/watchlist/components/no-watchlist-data';
import { getWatchedPackagesOnServer } from '@/api/package/watch/get-watched-packages-on-server';

export default async function DashboardWatchlistPage() {
  const w = await getWatchedPackagesOnServer();
  console.log('watchlist: ', w);
  return (
    <div>
      <BuyerLayoutTabs activePathname={BuyerDashboardWatchlist} />
      <NoWatchlistData />
    </div>
  );
}
