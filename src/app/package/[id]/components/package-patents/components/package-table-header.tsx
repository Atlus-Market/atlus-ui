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
      className={clsx(className, 'bg-peach leading-none', 'py-2 md:py-[14px] px-3 md:px-6', {
        'rounded-tl-lg': position === 'start',
        '!pl-0': position === 'middle',
        'rounded-tr-lg !pl-0 a': position === 'end',
        'rounded-t-lg': position === 'only',
      })}
    >
      {children}
    </div>
  );
};
