import { BasePackage } from '@/api/package/search/search-packages';
import { BasePackageCard } from '@/app/dashboard/components/package/base-package-card';
import { PackageOwner } from '@/app/dashboard/components/package/package-owner';
import { SearchPackageMenu } from '@/app/search/components/search-package-menu';

interface BuyerPackageSearchProps {
  basePackage: BasePackage;
}

export const BrokerPackageSearch = ({ basePackage }: BuyerPackageSearchProps) => {
  return (
    <BasePackageCard
      basePackage={basePackage}
      footer={<PackageOwner basePackage={basePackage} />}
      actions={<SearchPackageMenu basePackage={basePackage} />}
      showCreationDate={false}
    />
  );
};
