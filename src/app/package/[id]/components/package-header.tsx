import { AtlusTitle } from '@/components/ui/typography/atlus-title';
import { Package } from '@/models/package';
import { parseGMTDate } from '@/utils/date';
import format from 'date-fns/format';
import { User } from '@/models/user';
import { SharePackageButton } from '@/app/package/[id]/components/right-panel/share-package-button';

interface PackageHeaderProps {
  atlusPackage: Package;
  broker?: User;
  renderLimitedContent: boolean;
}

export const PackageHeader = ({
  atlusPackage: { title, createdTimestamp },
  renderLimitedContent,
}: PackageHeaderProps) => {
  const createdDate = parseGMTDate(createdTimestamp);
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
      {createdDate && (
        <p className="text-xs md:text-sm text-dark-grey font-normal">
          {format(createdDate, 'LLL d, yyyy')}
        </p>
      )}
    </div>
  );
};
