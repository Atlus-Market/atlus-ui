import { ReactNode } from 'react';
import clsx from 'clsx';

interface AtlusModalFooterProps {
  children: ReactNode;
  className?: string;
}

export const AtlusModalFooter = ({ children, className }: AtlusModalFooterProps) => {
  return (
    <div className={clsx('flex [&:has(:nth-child(2))]:justify-between justify-end items-center px-10 pt-4 pb-7', className)}>
      {children}
    </div>
  );
};
