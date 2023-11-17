import { BasePackage } from '@/api/package/search/search-packages';
import { PackageCardWrapper } from '@/app/dashboard/components/package-card-wrapper';
import { PackageImage } from '@/app/dashboard/components/package/package-image';
import { PackageTitle } from '@/app/dashboard/components/package/package-title';
import { MinimumScreenSize } from '@/components/common/minimum-screen-size';
import { PackageFamiliesAndDocuments } from '@/app/dashboard/components/package/package-families-and-documents';
import { PackageStatusTag } from '@/app/package/[id]/components/package-status-tag';
import { PackageCreation } from '@/app/package/[id]/components/package-creation';
import { ReactNode } from 'react';

interface BasePackageCardProps {
  basePackage: BasePackage;
  actions?: ReactNode;
  footer?: ReactNode;
  visibility?: ReactNode;
  showCreationDate?: boolean;
}

export const BasePackageCard = ({
  basePackage,
  actions,
  footer,
  visibility = null,
  showCreationDate = false,
}: BasePackageCardProps) => {
  const actionsWrapper = <div className="flex items-center gap-4">{actions}</div>;
  return (
    <PackageCardWrapper packageId={basePackage.id}>
      <div className="p-[18px] md:p-8 flex gap-4 md:gap-8">
        <PackageImage />
        <div className="w-full">
          <div className="flex justify-between items-center mb-[6px] md:mb-3">
            <PackageTitle title={basePackage.title} />
            <MinimumScreenSize minBreakpointKey="md">{actionsWrapper}</MinimumScreenSize>
          </div>
          <PackageFamiliesAndDocuments
            familiesCount={basePackage.numberOfFamilies}
            documentsCount={basePackage.numberOfDocuments}
            className="mb-[10px] md:mb-4"
          />
          <div className="flex gap-2 mb-[10px] md:mb-4">
            <PackageStatusTag status={basePackage.status} />
            {visibility}
          </div>
          <MinimumScreenSize minBreakpointKey="md">
            {showCreationDate && (
              <PackageCreation
                creationDate={basePackage.createdTimestamp}
                lastModified={basePackage.lastModified}
              />
            )}
            <div className="mt-6">{footer}</div>
          </MinimumScreenSize>
        </div>
      </div>
      <MinimumScreenSize minBreakpointKey="sm" maxBreakpointKey="md">
        <div className="flex border-t border-t-lightest-grey py-[18px] px-[18px] justify-between items-center">
          {footer}
          {actionsWrapper}
        </div>
      </MinimumScreenSize>
    </PackageCardWrapper>
  );
};
