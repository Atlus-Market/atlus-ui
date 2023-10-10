import { ReactNode } from 'react';
import clsx from 'clsx';
import { countValidChildren } from '@/utils/react.utils';

interface AtlusModalFooterProps {
  children: ReactNode;
  className?: string;
}

export const AtlusModalFooter = ({ children, className }: AtlusModalFooterProps) => {
  const validChildrenCount = 1; //countValidChildren(children);
  return (
    <div
      className={clsx(
        'flex modal-footer items-center w-full',
        'px-6 pt-5 pb-6 md:px-10 md:pt-4 md:pb-7',
        // [&:has(:nth-child(2))]:justify-between justify-end does not work on Safari.
        // It doesn't update after first render.
        validChildrenCount > 1 ? 'justify-between' : 'justify-end',
        className
      )}
    >
      {children}
    </div>
  );
};
