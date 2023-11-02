import format from 'date-fns/format';
import Image from 'next/image';
import CircleSVG from '@/public/assets/images/circle.svg';
import { formatSinceDate, parseGMTDate } from '@/utils/date';
import clsx from 'clsx';

interface PackageCreationProps {
  creationDate: string;
  lastModified: string;
  className?: string;
}

export const PackageCreation = ({
  creationDate,
  lastModified,
  className,
}: PackageCreationProps) => {
  const createdDate = parseGMTDate(creationDate);
  const updatedDate = parseGMTDate(lastModified);
  return (
    <div className={clsx('flex items-center leading-none', className)}>
      {createdDate && (
        <p className="text-xs md:text-sm text-dark-grey font-normal leading-normal">
          Created {format(createdDate, 'LLL d, yyyy')}
        </p>
      )}
      {updatedDate && (
        <div className="hidden md:flex md:items-center ">
          <Image src={CircleSVG} alt="circle" className="inline-block mx-2" />
          <p className="text-xs md:text-sm text-dark-grey font-normal leading-normal">
            Updated {formatSinceDate(updatedDate)}
          </p>
        </div>
      )}
    </div>
  );
};
