import { ReactNode } from 'react';
import clsx from 'clsx';

interface PackageTableRowProps {
  children: ReactNode;
  className?: string;
}

export const PackageTableCell = ({ children, className }: PackageTableRowProps) => {
  return <div className={clsx(className)}>{children}</div>;
};
