import { AtlusTitle } from '@/components/ui/typography/atlus-title';
import { Package } from '@/models/package';
import { SharePackageButton } from '@/app/package/[id]/components/right-panel/share-package-button';
import { PackageStatusTag } from '@/app/package/[id]/components/package-status-tag';
import { PackageCreation } from '@/app/package/[id]/components/package-creation';

interface PackageHeaderProps {
  atlusPackage: Package;
  renderLimitedContent: boolean;
}

export const PackageHeader = ({
  atlusPackage: { title, createdTimestamp, lastModified, status },
  renderLimitedContent,
}: PackageHeaderProps) => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <AtlusTitle text={'TODO: Add Company'} className="mb-1 !text-xl" />
        {!renderLimitedContent && (
          <div className="block lg:hidden">
            <SharePackageButton />
          </div>
        )}
      </div>

      <AtlusTitle text={title} className="text-lg md:text-2xl font-normal mb-2" />
      <PackageCreation
        creationDate={createdTimestamp}
        lastModified={lastModified}
        className="mb-2 md:mb-3"
      />
      <PackageStatusTag status={status} />
    </div>
  );
};
