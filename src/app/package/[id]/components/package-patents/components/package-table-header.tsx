import clsx from 'clsx';
import { ReactNode } from 'react';

interface PackageTableHeaderProps {
  className?: string;
  children: ReactNode;
}

export const PackageTableHeader = ({ className, children }: PackageTableHeaderProps) => {
  return (
    <div
      className={clsx(
        className,
        'bg-light-grey-2 leading-none',
        'py-2 md:py-[14px] px-3 md:px-6',
        'mb-3 md:mb-0'
      )}
    >
      {children}
    </div>
  );
};
