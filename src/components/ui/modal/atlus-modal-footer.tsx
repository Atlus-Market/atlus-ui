import { ReactNode } from 'react';
import clsx from 'clsx';

interface AtlusModalFooterProps {
  children: ReactNode;
  className?: string;
}

export const AtlusModalFooter = ({ children, className }: AtlusModalFooterProps) => {
  return (
    <div className={clsx('flex justify-end p-10', className)}>
      {children}
    </div>
  );
};
