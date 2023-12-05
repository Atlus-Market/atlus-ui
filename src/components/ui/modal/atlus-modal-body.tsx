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
  return (
    <div
      className={clsx(
        'w-full',
        {
          [atlusMediumModalBodyPx]: isMediumSize,
          'w-[360px] md:w-[540px]': isMediumSize,
          'px-6 md:px-40 w-[319px] md:w-[740px]': isDialogSize,
        },
        className
      )}
    >
      {children}
    </div>
  );
};
