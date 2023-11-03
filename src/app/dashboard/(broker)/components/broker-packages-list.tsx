import { Package } from '@/models/package';
import { BrokerPackage } from '@/app/dashboard/(broker)/components/package/broker-package';
import Link from 'next/link';
import { PackagePageUrl } from '@/constants/routes';

interface BrokerPackagesListProps {
  packages: Package[];
}

export const BrokerPackagesList = ({ packages }: BrokerPackagesListProps) => {
  return (
    <>
      {packages.map(atlusPackage => (
        <Link href={PackagePageUrl(atlusPackage.id)} key={atlusPackage.id}>
          <BrokerPackage
            atlusPackage={atlusPackage}
            className="[&:not(:last-child)]:mb-4 [&:not(:last-child)]:md:mb-6"
          />
        </Link>
      ))}
    </>
  );
};
