'use client';

import clsx from 'clsx';
import { AtlusTagRemoveButton } from '@/components/ui/tag/atlus-tag-remove-button';

interface TagProps {
  size?: 'big' | 'small';
  text: string;
  onClose?: () => void;
  className?: string;
}

export const AtlusTag = ({ text, onClose, className, size = 'big' }: TagProps) => {
  const isBigSize = size === 'big';
  return (
    <div
      className={clsx(
        'inline-flex items-center bg-off-white rounded',
        isBigSize ? 'px-3 py-2' : 'px-2 py-[6px]',
        className
      )}
    >
      <span
        className={clsx(
          'font-medium  text-orange inline-block',
          isBigSize ? 'text-sm leading-[17px]' : 'text-xs leading-[15px]'
        )}
      >
        {text}
      </span>
      {onClose && <AtlusTagRemoveButton onClick={onClose} size={size} />}
    </div>
  );
};
