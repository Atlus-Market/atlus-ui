import { Package } from '@/models/package';
import { BrokerPackage } from '@/app/dashboard/(broker)/components/package/broker-package';
import { PackageLink } from '@/app/dashboard/components/package/package-link';
import { PackagesListWrapper } from '@/app/dashboard/components/packages-list-wrapper';
import { SharePackageModal } from '@/app/package/share/share-package-modal';

interface BrokerPackagesListProps {
  packages: Package[];
}

export const BrokerPackagesList = ({ packages }: BrokerPackagesListProps) => {
  return (
    <>
      <SharePackageModal />;
      <PackageLink>
        <PackagesListWrapper>
          {packages.map(atlusPackage => (
            // Don't wrap with Link because other Links inside are used
            <BrokerPackage key={atlusPackage.id} atlusPackage={atlusPackage} />
          ))}
        </PackagesListWrapper>
      </PackageLink>
    </>
  );
};
