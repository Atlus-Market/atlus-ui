import { ReactNode } from 'react';
import clsx from 'clsx';
import { countValidChildren } from '@/utils/react.utils';

interface AtlusModalFooterProps {
  children: ReactNode;
  className?: string;
}


export const AtlusModalFooter = ({ children, className }: AtlusModalFooterProps) => {
  const validChildrenCount = countValidChildren(children);
  return (
    <div
      className={clsx(
        'flex modal-footer items-center px-10 pt-4 pb-7',

        // [&:has(:nth-child(2))]:justify-between justify-end does not work on Safari.
        // It doesn't update after first render.
        validChildrenCount > 1 ? 'justify-between' : 'justify-end'
      )}>
      {children}
    </div>
  );
};
