import { Package } from '@/models/package';
import { PackageTitle } from '@/app/(protected-routes)/dashboard/components/package/package-title';
import { PackageFamiliesAndDocuments } from '@/app/(protected-routes)/dashboard/components/package/package-families-and-documents';
import { PackageStatusTag } from '@/app/(protected-routes)/package/[id]/components/package-status-tag';
import { PackageVisibilityTag } from '@/app/(protected-routes)/dashboard/components/package/package-visibility-tag';
import { PackageCreation } from '@/app/(protected-routes)/package/[id]/components/package-creation';
import { PackageStats } from '@/app/(protected-routes)/dashboard/components/package/package-stats';
import { BrokerPackageMenu } from '@/app/(protected-routes)/dashboard/(broker)/components/package/broker-package-menu';
import { PackageImage } from '@/app/(protected-routes)/dashboard/components/package/package-image';
import { PackageCardWrapper } from '@/app/(protected-routes)/dashboard/components/package-card-wrapper';
import { MinimumScreenSize } from '@/components/common/minimum-screen-size';

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
            <MinimumScreenSize minBreakpointKey="md">{menu}</MinimumScreenSize>
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
          <MinimumScreenSize minBreakpointKey="md">
            <div className="mt-6">
              <PackageStats atlusPackage={atlusPackage} />
            </div>
          </MinimumScreenSize>
        </div>
      </div>
      <MinimumScreenSize minBreakpointKey="sm" maxBreakpointKey="md">
        <div className="flex border-t border-t-lightest-grey py-[18px] px-[18px] justify-between items-center">
          <PackageStats atlusPackage={atlusPackage} />
          {menu}
        </div>
      </MinimumScreenSize>
    </PackageCardWrapper>
  );
};
