import { BuyerPackageData } from '@/api/package/get-shared-packages-on-server';

interface BuyerPackageProps {
  buyerPackage: BuyerPackageData;
}

export const BuyerPackage = ({ buyerPackage }: BuyerPackageProps) => {
  return <div>{buyerPackage.title}</div>;
};
