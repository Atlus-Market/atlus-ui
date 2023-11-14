import { Package } from '@/models/package';
import { PackageTitle } from '@/app/dashboard/components/package/package-title';
import { PackageFamiliesAndDocuments } from '@/app/dashboard/components/package/package-families-and-documents';
import { PackageStatusTag } from '@/app/package/[id]/components/package-status-tag';
import { PackageVisibilityTag } from '@/app/dashboard/components/package/package-visibility-tag';
import { PackageCreation } from '@/app/package/[id]/components/package-creation';
import { PackageStats } from '@/app/dashboard/components/package/package-stats';
import { BrokerPackageMenu } from '@/app/dashboard/(broker)/components/package/broker-package-menu';
import { PackageImage } from '@/app/dashboard/components/package/package-image';
import { PackageCardWrapper } from '@/app/dashboard/components/package-card-wrapper';

interface BrokerPackageProps {
  atlusPackage: Package;
}

export const BrokerPackage = ({ atlusPackage }: BrokerPackageProps) => {
  const menu = <BrokerPackageMenu atlusPackage={atlusPackage} />;
  return (
    <PackageCardWrapper packageId={atlusPackage.id}>
      <div className="p-[18px] md:p-8 flex gap-4 md:gap-8">
        <PackageImage />
        <div className="w-full">
          <div className="flex justify-between items-center mb-[6px] md:mb-3">
            <PackageTitle title={atlusPackage.title} />
            <div className="hidden md:flex">{menu}</div>
          </div>
          <PackageFamiliesAndDocuments
            familiesCount={atlusPackage.numberOfFamilies}
            documentsCount={atlusPackage.numberOfDocuments}
            className="mb-[10px] md:mb-4"
          />
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
      <div className="flex md:hidden border-t border-t-lightest-grey py-[18px] px-[18px] justify-between items-center">
        <PackageStats atlusPackage={atlusPackage} />
        {menu}
      </div>
    </PackageCardWrapper>
  );
};
