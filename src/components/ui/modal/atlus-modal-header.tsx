import { ReactNode } from 'react';

interface AtlusModalHeaderProps {
  leftContent?: ReactNode;
  rightContent?: ReactNode;
  children?: ReactNode;
}

export const AtlusModalHeader = ({
                                   leftContent,
                                   children,
                                   rightContent
                                 }: AtlusModalHeaderProps) => {
  return (
    <div className='flex justify-between items-center'>
      <div className="flex justify-start items-center gap-6">
        {leftContent}
        {children}
      </div>
      {rightContent}
    </div>
  );
};
