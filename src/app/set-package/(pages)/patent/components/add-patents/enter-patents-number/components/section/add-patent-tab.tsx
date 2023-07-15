'use client';

import clsx from 'clsx';

interface SectionTabProps {
  isActive: boolean;
  text: string;
  onSelected?: () => void;
}

export const AddPatentTab = ({ isActive, text, onSelected }: SectionTabProps) => {
  return (
    <div
      onClick={onSelected}
      className={clsx(
        'text-base font-medium',
        'hover:cursor-pointer',
        isActive ? 'text-orange underline underline-offset-8 decoration-2' : 'text-dark-grey'
      )}>
      {text}
    </div>
  );
};
