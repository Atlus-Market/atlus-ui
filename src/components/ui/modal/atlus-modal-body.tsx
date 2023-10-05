import { ReactNode } from 'react';
import clsx from 'clsx';

interface AtlusModalBodyProps {
  children: ReactNode;
  className?: string;
}

export const atlusModalBodyPaddingX = 'px-[18px] md:px-10';
export const atlusModalBodyPaddingY = 'py-[18px] md:py-10';

export const AtlusModalBody = ({ children, className }: AtlusModalBodyProps) => {
  return (
    <div
      className={clsx(
        'modal-body w-full md:w-auto',
        atlusModalBodyPaddingX,
        atlusModalBodyPaddingY,
        className
      )}
    >
      {children}
    </div>
  );
};
