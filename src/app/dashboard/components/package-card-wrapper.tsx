import clsx from 'clsx';
import { ReactNode } from 'react';

interface PackageCardWrapperProps {
  packageId: string;
  className?: string;
  children: ReactNode;
}

export const PackageCardWrapper = ({ children, packageId, className }: PackageCardWrapperProps) => {
  return (
    <div
      className={clsx('bg-white rounded-xl', 'max-w-[909px]', className)}
      data-package-id={packageId}
    >
      {children}
    </div>
  );
};
