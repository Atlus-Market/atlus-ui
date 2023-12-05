import { ReactNode } from 'react';
import clsx from 'clsx';

interface PackageTableRowProps {
  children: ReactNode;
  className?: string;
}

export const PackageTableCell = ({ children, className }: PackageTableRowProps) => {
  return (
    <div
      className={clsx(
        'px-3 md:px-4',
        'word-break-break-word',
        'pb-3 pt-0 md:pb-6 md:pt-6',
        className
      )}
    >
      {children}
    </div>
  );
};