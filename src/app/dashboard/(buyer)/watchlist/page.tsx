import { BuyerLayoutTabs } from '@/app/dashboard/(buyer)/buyer-layout-tabs';
import { BuyerDashboardWatchlist } from '@/constants/routes';
import { NoWatchlistData } from '@/app/dashboard/(buyer)/watchlist/components/no-watchlist-data';
import { getWatchedPackagesOnServer } from '@/api/package/watch/get-watched-packages-on-server';
import { BuyerPackagesList } from '@/app/dashboard/(buyer)/components/buyer-packages-list';

export default async function DashboardWatchlistPage() {
  const packages = await getWatchedPackagesOnServer();
  const hasPackages = packages?.length > 0;
  return (
    <div>
      <BuyerLayoutTabs activePathname={BuyerDashboardWatchlist} />

      {hasPackages ? <BuyerPackagesList packages={packages} /> : <NoWatchlistData />}
    </div>
  );
}
