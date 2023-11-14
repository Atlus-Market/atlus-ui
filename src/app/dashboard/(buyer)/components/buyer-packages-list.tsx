import { BuyerPackageData } from '@/api/package/access/get-shared-packages-on-server';
import { BuyerPackage } from '@/app/dashboard/(buyer)/components/buyer-package';
import { PackagesListWrapper } from '@/app/dashboard/components/packages-list-wrapper';
import { PackageLink } from '@/app/dashboard/components/package/package-link';
import { SharePackageModal } from '@/app/package/share/share-package-modal';

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
