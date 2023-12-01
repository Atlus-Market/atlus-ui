import { BuyerPackageMenu } from '@/app/(main)/dashboard/(buyer)/components/buyer-package-menu';
import { PackageWatchlist } from '@/app/(main)/dashboard/components/package/watchlist/package-watchlist';
import { PackageOwner } from '@/app/(main)/dashboard/components/package/package-owner';
import { BasePackage } from '@/api/package/search/search-packages';
import { BasePackageCard } from '@/app/(main)/dashboard/components/package/base-package-card';

interface BuyerPackageProps {
  basePackage: BasePackage;
}

export const BuyerPackage = ({ basePackage }: BuyerPackageProps) => {
  return (
    <BasePackageCard
      basePackage={basePackage}
      footer={<PackageOwner basePackage={basePackage} />}
      actions={
        <>
          <PackageWatchlist packageId={basePackage.id} isWatched={basePackage.isWatched} />
          <BuyerPackageMenu basePackage={basePackage} />
        </>
      }
    />
  );
};
