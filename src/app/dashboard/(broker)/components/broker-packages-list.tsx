import { BrokerPackage } from '@/app/dashboard/(broker)/components/package/broker-package';
import { PackageLink } from '@/app/dashboard/components/package/package-link';
import { PackagesListWrapper } from '@/app/dashboard/components/packages-list-wrapper';
import { SharePackageModal } from '@/app/package/share/share-package-modal';
import { BasePackage } from '@/api/package/search/search-packages';

interface BrokerPackagesListProps {
  basePackages: BasePackage[];
}

export const BrokerPackagesList = ({ basePackages }: BrokerPackagesListProps) => {
  return (
    <>
      <SharePackageModal />
      <PackageLink>
        <PackagesListWrapper>
          {basePackages.map(atlusPackage => (
            // Don't wrap with Link because other Links inside are used
            <BrokerPackage key={atlusPackage.id} basePackage={atlusPackage} />
          ))}
        </PackagesListWrapper>
      </PackageLink>
    </>
  );
};
