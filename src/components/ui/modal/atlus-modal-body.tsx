import { ReactNode } from 'react';
import clsx from 'clsx';

interface AtlusModalBodyProps {
  children: ReactNode;
  className?: string;
}

export const AtlusModalBody = ({ children, className }: AtlusModalBodyProps) => {
  return (
    <div className={clsx('modal-body p-[18px] md:p-10 w-full md:w-auto', className)}>
      {children}
    </div>
  );
};
