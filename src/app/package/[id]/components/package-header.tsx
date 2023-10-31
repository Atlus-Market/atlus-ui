import { AtlusTitle } from '@/components/ui/typography/atlus-title';
import { Package } from '@/models/package';
import { formatSinceDate, parseGMTDate } from '@/utils/date';
import format from 'date-fns/format';
import { User } from '@/models/user';
import { SharePackageButton } from '@/app/package/[id]/components/right-panel/share-package-button';
import CircleSVG from '@/public/assets/images/circle.svg';
import Image from 'next/image';
import { PackageStatusTag } from '@/app/package/[id]/components/package-status-tag';

interface PackageHeaderProps {
  atlusPackage: Package;
  renderLimitedContent: boolean;
}

export const PackageHeader = ({
  atlusPackage: { title, createdTimestamp, lastModified, status },
  renderLimitedContent,
}: PackageHeaderProps) => {
  const createdDate = parseGMTDate(createdTimestamp);
  const updatedDate = parseGMTDate(lastModified);
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
      <div className="flex items-center mb-2 md:mb-3">
        {createdDate && (
          <p className="text-xs md:text-sm text-dark-grey font-normal">
            Created {format(createdDate, 'LLL d, yyyy')}
          </p>
        )}

        {updatedDate && (
          <div className="hidden md:flex md:items-center ">
            <Image src={CircleSVG} alt="circle" className="inline-block mx-2" />
            <p className="text-xs md:text-sm text-dark-grey font-normal">
              Updated {formatSinceDate(updatedDate)}
            </p>
          </div>
        )}
      </div>
      <PackageStatusTag status={status} />
    </div>
  );
};
