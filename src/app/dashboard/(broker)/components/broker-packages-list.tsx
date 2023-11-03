import { Package } from '@/models/package';
import { BrokerPackage } from '@/app/dashboard/(broker)/components/package/broker-package';
import { BrokerPackageActions } from '@/app/dashboard/(broker)/components/broker-package-actions';
import { PackageLink } from '@/app/dashboard/components/package/package-link';

interface BrokerPackagesListProps {
  packages: Package[];
}

export const BrokerPackagesList = ({ packages }: BrokerPackagesListProps) => {
  return (
    <>
      <BrokerPackageActions />
      <PackageLink>
        {packages.map(atlusPackage => (
          // Don't wrap with Link because other Links inside are used
          <BrokerPackage
            key={atlusPackage.id}
            atlusPackage={atlusPackage}
            className="[&:not(:last-child)]:mb-4 [&:not(:last-child)]:md:mb-6"
          />
        ))}
      </PackageLink>
    </>
  );
};
