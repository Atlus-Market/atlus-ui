import { ReactNode } from 'react';
import clsx from 'clsx';

interface PageWrapperProps {
  children: ReactNode;
  className?: string;
}

export const PageWrapper = ({ children, className }: PageWrapperProps) => {
  return (
    <div className={clsx(
      'w-full p-[24px] md:p-[40px]',
      className
    )}>
      {children}
    </div>
  );
};
