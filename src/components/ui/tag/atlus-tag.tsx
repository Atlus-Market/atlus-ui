'use client';

import clsx from 'clsx';
import { AtlusTagRemoveButton } from '@/components/ui/tag/atlus-tag-remove-button';

interface TagProps {
  text: string;
  onClose?: () => void;
  className?: string;
}

export const AtlusTag = ({ text, onClose, className }: TagProps) => {
  return (
    <div
      className={clsx(
        'px-3 py-2 inline-flex items-center bg-off-white rounded',
        className
      )}
    >
      <span className='font-medium text-sm leading-[17px] text-orange inline-block'>
        {text}
      </span>
      {onClose && (<AtlusTagRemoveButton onClick={onClose} />)}
    </div>
  );
};
