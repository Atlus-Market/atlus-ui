import { BuyerPackageData } from '@/api/package/access/get-shared-packages-on-server';
import { BuyerPackage } from '@/app/(protected-routes)/dashboard/(buyer)/components/buyer-package';
import { PackagesListWrapper } from '@/app/(protected-routes)/dashboard/components/packages-list-wrapper';
import { PackageLink } from '@/app/(protected-routes)/dashboard/components/package/package-link';
import { SharePackageModal } from '@/app/(protected-routes)/package/share/share-package-modal';

interface BuyerPackagesListProps {
  packages: BuyerPackageData[];
}

export const BuyerPackagesList = ({ packages }: BuyerPackagesListProps) => {
  const packagesList = packages.map(buyerPackage => (
    <BuyerPackage key={buyerPackage.id} buyerPackage={buyerPackage} />
  ));
  return (
    <>
      <SharePackageModal />
      <PackageLink>
        <PackagesListWrapper>{packagesList}</PackagesListWrapper>
      </PackageLink>
    </>
  );
};
