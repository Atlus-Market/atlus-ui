import clsx from 'clsx';
import { ReactNode } from 'react';

interface SectionTabProps {
  isActive: boolean;
  text: ReactNode;
  onSelected?: () => void;
}

export const AtlusTab = ({ isActive, text, onSelected }: SectionTabProps) => {
  return (
    <div
      onClick={onSelected}
      className={clsx(
        'text-sm md:text-base font-medium',
        'hover:cursor-pointer',
        isActive ? 'text-orange underline underline-offset-8 decoration-2' : 'text-dark-grey'
      )}
    >
      {text}
    </div>
  );
};
