import { ReactNode } from 'react';
import clsx from 'clsx';
import { useAtlusModalContext } from '@/components/ui/modal/use-atlus-modal-context';

interface AtlusModalBodyProps {
  children: ReactNode;
  className?: string;
}

export const atlusMediumModalBodyPx = 'px-[18px] md:px-40';

export const AtlusModalBody = ({ children, className }: AtlusModalBodyProps) => {
  const { size } = useAtlusModalContext();
  const isMediumSize = size === 'medium';
  const isDialogSize = size === 'dialog';
  const isLargeSize = size === 'large';

  return (
    <div
      className={clsx(
        {
          'px-6 md:px-40 w-[319px] md:w-[540px]': isDialogSize,
          [atlusMediumModalBodyPx]: isMediumSize || isLargeSize,
          'w-[360px] md:w-[540px]': isMediumSize,
        },
        className
      )}
    >
      {children}
    </div>
  );
};
