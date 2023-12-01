import { BrokerPackageMenu } from '@/app/(main)/dashboard/(broker)/components/package/broker-package-menu';
import { BasePackage } from '@/api/package/search/search-packages';
import { BasePackageCard } from '@/app/(main)/dashboard/components/package/base-package-card';
import { PackageStats } from '@/app/(main)/dashboard/components/package/package-stats';
import { PackageVisibilityTag } from '@/app/(main)/dashboard/components/package/package-visibility-tag';

interface BrokerPackageProps {
  basePackage: BasePackage;
}

export const BrokerPackage = ({ basePackage }: BrokerPackageProps) => {
  return (
    <BasePackageCard
      basePackage={basePackage}
      footer={<PackageStats packageStats={basePackage} />}
      actions={<BrokerPackageMenu basePackage={basePackage} />}
      showCreationDate={true}
      visibility={<PackageVisibilityTag visibility={basePackage.visibility} />}
    />
  );
};
