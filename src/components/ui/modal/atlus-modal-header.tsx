import { ReactNode } from 'react';
import clsx from 'clsx';
import { useAtlusModalContext } from '@/components/ui/modal/use-atlus-modal-context';

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
  rightContent,
}: AtlusModalHeaderProps) => {
  const { size } = useAtlusModalContext();
  const isMediumSize = size === 'medium';
  const isDialogSize = size === 'dialog';
  return (
    <div
      className={clsx(
        'flex justify-between items-center w-full',
        {
          'pt-4 pb-6 px-4 md:px-40 md:py-8': isMediumSize,
          'px-6 pt-6 pb-5 md:px-40 md:pt-40 md:pb-6': isDialogSize,
        },
        className
      )}
    >
      <div className="flex justify-start items-center gap-6 w-full">
        {leftContent}
        {children}
      </div>
      {rightContent}
    </div>
  );
};
