import { AtlusTitle } from '@/components/ui/typography/atlus-title';
import { Package } from '@/models/package';
import { parseGMTDate } from '@/utils/date';
import format from 'date-fns/format';
import { User } from '@/models/user';
import { SharePackage } from '@/app/package/[id]/components/right-panel/share-package';

interface PackageHeaderProps {
  atlusPackage: Package;
  broker: User;
}

export const PackageHeader = ({
  atlusPackage: { id, title, createdTimestamp },
  broker,
}: PackageHeaderProps) => {
  const createdDate = parseGMTDate(createdTimestamp);
  return (
    <div>
      <div className="flex justify-between items-center">
        <AtlusTitle text={broker.companyName} className="mb-1 !text-xl" />
        <div className="block lg:hidden">
          <SharePackage packageId={id} />
        </div>
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
