import { ReactNode } from 'react';
import clsx from 'clsx';

interface AtlusModalHeaderProps {
  className?: string;
  leftContent?: ReactNode;
  rightContent?: ReactNode;
  children?: ReactNode;
}

export const AtlusModalHeader = ({
                                   className,
                                   leftContent,
                                   children,
                                   rightContent
                                 }: AtlusModalHeaderProps) => {
  return (
    <div className={clsx('flex justify-between items-center', className)}>
      <div className='flex justify-start items-center gap-6'>
        {leftContent}
        {children}
      </div>
      {rightContent}
    </div>
  );
};
