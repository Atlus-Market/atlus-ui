import { ReactNode } from 'react';
import clsx from 'clsx';
import { useAtlusModalContext } from '@/components/ui/modal/use-atlus-modal-context';

interface AtlusModalFooterProps {
  children: ReactNode;
  className?: string;
}

export const AtlusModalFooter = ({ children, className }: AtlusModalFooterProps) => {
  const { size } = useAtlusModalContext();
  const isMediumSize = size === 'medium';
  const isDialogSize = size === 'dialog';
  const validChildrenCount = 1; //countValidChildren(children);
  return (
    <div
      className={clsx(
        'flex modal-footer items-center w-full',
        // [&:has(:nth-child(2))]:justify-between justify-end does not work on Safari.
        // It doesn't update after first render.
        validChildrenCount > 1 ? 'justify-between' : 'justify-end',
        {
          'px-4 pt-5 pb-8 md:px-40 md:pt-6 md:pb-8': isMediumSize,
          'p-6 md:p-40': isDialogSize,
        },
        className
      )}
    >
      {children}
    </div>
  );
};
