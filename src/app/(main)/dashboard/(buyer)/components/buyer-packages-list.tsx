import { BuyerPackage } from '@/app/(main)/dashboard/(buyer)/components/buyer-package';
import { PackagesListWrapper } from '@/app/(main)/dashboard/components/packages-list-wrapper';
import { PackageLink } from '@/app/(main)/dashboard/components/package/package-link';
import { SharePackageModal } from '@/app/(main)/package/share/share-package-modal';
import { BasePackage } from '@/api/package/search/search-packages';

interface BuyerPackagesListProps {
  packages: BasePackage[];
}

export const BuyerPackagesList = ({ packages }: BuyerPackagesListProps) => {
  const packagesList = packages.map(basePackage => (
    <BuyerPackage key={basePackage.id} basePackage={basePackage} />
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
