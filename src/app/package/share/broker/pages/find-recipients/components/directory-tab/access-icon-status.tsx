import clsx from 'clsx';
import { HiEye } from 'react-icons/hi2';
import { PackageAccess } from '@/models/package-access';
import { HiMailOpen } from 'react-icons/hi';

interface AccessIconStatusProps {
  className?: string;
  packageAccess: PackageAccess;
}

const iconSize = 'text-base md:text-[18px]';

export const AccessIconStatus = ({ className, packageAccess }: AccessIconStatusProps) => {
  const { clickedLink, openedEmail } = packageAccess;

  if (!clickedLink && !openedEmail) {
    return null;
  }

  let iconCmp = null;

  if (openedEmail) {
    iconCmp = <HiMailOpen className={clsx('text-dark-grey', iconSize)} />;
  } else {
    iconCmp = <HiEye className={clsx('text-orange', iconSize)} />;
  }

  return (
    <div
      className={clsx(
        'w-6 h-6 md:w-[26px] md:h-[26px]',
        'bg-white rounded-[50%]',
        'flex items-center justify-center',
        className
      )}
    >
      {iconCmp}
    </div>
  );
};
