import clsx from 'clsx';
import { ReactNode } from 'react';

interface PackageTableHeaderProps {
  position?: 'start' | 'middle' | 'end' | 'only';
  className?: string;
  children: ReactNode;
}

export const PackageTableHeader = ({ position, className, children }: PackageTableHeaderProps) => {
  return (
    <div
      className={clsx(className, 'bg-[#FCFCFC] leading-none', 'py-2 md:py-[14px] px-3 md:px-6', {
        '': position === 'start',
        '!pl-0': position === 'middle',
        '!pl-0 a': position === 'end',
        '': position === 'only',
      })}
    >
      {children}
    </div>
  );
};
