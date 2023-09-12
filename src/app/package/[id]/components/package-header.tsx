import { AtlusTitle } from '@/components/ui/typography/atlus-title';
import { Package } from '@/models/package';
import { parseGMTDate } from '@/utils/date';
import format from 'date-fns/format';

interface PackageHeaderProps {
  atlusPackage: Package;
}

export const PackageHeader = ({
  atlusPackage: { title, createdTimestamp },
}: PackageHeaderProps) => {
  const createdDate = parseGMTDate(createdTimestamp);
  return (
    <div>
      <AtlusTitle text="Company Logo" className="mb-1" />
      <AtlusTitle text={title} className="text-lg md:text-2xl font-normal mb-2" />
      {createdDate && (
        <p className="text-xs md:text-sm text-dark-grey font-normal">
          {format(createdDate, 'LLL d, yyyy')}
        </p>
      )}
    </div>
  );
};
