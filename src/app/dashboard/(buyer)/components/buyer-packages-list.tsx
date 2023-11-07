import { BuyerPackageData } from '@/api/package/get-shared-packages-on-server';
import { BuyerPackage } from '@/app/dashboard/(buyer)/components/buyer-package';

interface BuyerPackagesListProps {
  packages: BuyerPackageData[];
}

export const BuyerPackagesList = ({ packages }: BuyerPackagesListProps) => {
  const packagesList = packages.map(buyerPackage => (
    <BuyerPackage key={buyerPackage.id} buyerPackage={buyerPackage} />
  ));
  return <>{packagesList}</>;
};
