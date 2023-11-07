import { BuyerLayoutTabs } from '@/app/dashboard/(buyer)/buyer-layout-tabs';
import { BuyerDashboardWatchlist } from '@/constants/routes';
import { NoData } from '@/app/dashboard/components/no-data';
import AddNotesSVG from '@/public/assets/images/add_notes.svg';

export default async function DashboardWatchlistPage() {
  return (
    <div>
      <BuyerLayoutTabs activePathname={BuyerDashboardWatchlist} />
      <NoData
        image={AddNotesSVG}
        subtitle={
          <span className="text-dark-grey">Add packages to your watchlist to see them here</span>
        }
      />
    </div>
  );
}
