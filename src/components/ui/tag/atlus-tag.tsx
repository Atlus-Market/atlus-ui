'use client';

import clsx from 'clsx';
import { AtlusTagRemoveButton } from '@/components/ui/tag/atlus-tag-remove-button';

export type AtlusTagSize = 'big' | 'small' | 'auto';

interface TagProps {
  size?: AtlusTagSize;
  text: string;
  onClose?: () => void;
  className?: string;
}

export const AtlusTag = ({ text, onClose, className, size = 'auto' }: TagProps) => {
  const isAutoSize = size === 'auto';
  const isBigSize = size === 'big';
  const isSmallSize = size === 'small';
  return (
    <div
      className={clsx(
        'inline-flex items-center bg-off-white rounded',
        { 'px-2 py-[6px] md:px-3 md:py-2': isAutoSize },
        { 'px-3 py-2': isBigSize },
        { 'px-2 py-[6px]': isSmallSize },
        'flex-shrink-0',
        className
      )}
    >
      <span
        className={clsx(
          'font-medium  text-orange inline-block',
          { 'text-xs leading-[15px] md:text-sm md:leading-[17px]': isAutoSize },
          { 'text-sm leading-[17px]': isBigSize },
          { 'text-xs leading-[15px]': isSmallSize }
        )}
      >
        {text}
      </span>
      {onClose && <AtlusTagRemoveButton onClick={onClose} size={size} />}
    </div>
  );
};
