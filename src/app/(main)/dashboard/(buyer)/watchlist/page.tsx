import { BuyerLayoutTabs } from '@/app/(main)/dashboard/(buyer)/buyer-layout-tabs';
import { BuyerDashboardWatchlist } from '@/constants/routes';
import { NoWatchlistData } from '@/app/(main)/dashboard/(buyer)/watchlist/components/no-watchlist-data';
import { getWatchedPackagesOnServer } from '@/api/package/watch/get-watched-packages-on-server';
import { BuyerPackagesList } from '@/app/(main)/dashboard/(buyer)/components/buyer-packages-list';

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
