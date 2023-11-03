import { Package } from '@/models/package';
import { PackageTitle } from '@/app/dashboard/components/package/package-title';
import { PackageFamiliesAndDocuments } from '@/app/dashboard/components/package/package-families-and-documents';
import { PackageStatusTag } from '@/app/package/[id]/components/package-status-tag';
import { PackageVisibilityTag } from '@/app/dashboard/components/package/package-visibility-tag';
import { PackageCreation } from '@/app/package/[id]/components/package-creation';
import { PackageStats } from '@/app/dashboard/components/package/package-stats';
import { BrokerPackageMenu } from '@/app/dashboard/(broker)/components/package/broker-package-menu';
import clsx from 'clsx';
import { PackageImage } from '@/app/dashboard/packages/package-image';

interface BrokerPackageProps {
  atlusPackage: Package;
  className?: string;
}

export const BrokerPackage = ({ atlusPackage, className }: BrokerPackageProps) => {
  return (
    <div className={clsx('bg-white rounded-xl', className)}>
      <div className="p-[18px] md:p-8 flex gap-4 md:gap-8">
        <PackageImage />
        <div>
          <div className="flex justify-between items-center">
            <PackageTitle title={atlusPackage.title} className="mb-[6px] md:mb-3 block" />
            <div className="hidden md:block">
              <BrokerPackageMenu />
            </div>
          </div>
          <PackageFamiliesAndDocuments atlusPackage={atlusPackage} className="mb-[10px] md:mb-4" />
          <div className="flex gap-2 mb-[10px] md:mb-4">
            <PackageStatusTag status={atlusPackage.status} />
            <PackageVisibilityTag visibility={atlusPackage.visibility} />
          </div>
          <PackageCreation
            creationDate={atlusPackage.createdTimestamp}
            lastModified={atlusPackage.lastModified}
          />
          <div className="hidden md:block mt-6">
            <PackageStats atlusPackage={atlusPackage} />
          </div>
        </div>
      </div>
      <div className="flex md:hidden border-t border-t-lightest-grey py-5 px-[18px] justify-between items-center">
        <PackageStats atlusPackage={atlusPackage} />
        <BrokerPackageMenu />
      </div>
    </div>
  );
};
