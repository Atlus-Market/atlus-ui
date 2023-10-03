import { ReactNode } from 'react';
import clsx from 'clsx';

interface AtlusTabsProps {
  children: ReactNode;
  className?: string;
}

export const AtlusTabs = ({ children, className }: AtlusTabsProps) => {
  return (
    <div className={clsx('flex justify-start items-center gap-[45px] mb-[40px]', className)}>
      {children}
    </div>
  );
};
