import { Package } from '@/models/package';
import { BrokerPackage } from '@/app/dashboard/(broker)/components/package/broker-package';

interface BrokerPackagesListProps {
  packages: Package[];
}

export const BrokerPackagesList = ({ packages }: BrokerPackagesListProps) => {
  return (
    <>
      {packages.map(atlusPackage => (
        <BrokerPackage
          key={atlusPackage.id}
          atlusPackage={atlusPackage}
          className="[&:not(:last-child)]:mb-4 [&:not(:last-child)]:md:mb-6"
        />
      ))}
    </>
  );
};
