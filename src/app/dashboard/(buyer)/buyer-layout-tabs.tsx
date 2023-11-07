import { AtlusTabs } from '@/components/ui/tabs/atlus-tabs';
import { AtlusTab } from '@/components/ui/tabs/atlus-tab';
import Link from 'next/link';
import {
  BuyerDashboardRecommended,
  BuyerDashboardShared,
  BuyerDashboardWatchlist,
} from '@/constants/routes';

interface BuyerLayoutTabsProps {
  activePathname: string;
}

export const BuyerLayoutTabs = ({ activePathname }: BuyerLayoutTabsProps) => {
  return (
    <>
      <AtlusTabs>
        <Link href={BuyerDashboardShared}>
          <AtlusTab
            isActive={activePathname === BuyerDashboardShared}
            text={
              <>
                <span className="hidden md:block">Shared with you</span>
                <span className="block md:hidden">Shared</span>
              </>
            }
          />
        </Link>
        <Link href={BuyerDashboardRecommended}>
          <AtlusTab isActive={activePathname === BuyerDashboardRecommended} text="Recommended" />
        </Link>
        <Link href={BuyerDashboardWatchlist}>
          <AtlusTab isActive={activePathname === BuyerDashboardWatchlist} text="Watchlist" />
        </Link>
      </AtlusTabs>
    </>
  );
};
