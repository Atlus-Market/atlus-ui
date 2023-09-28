'use client';

import clsx from 'clsx';
import { AtlusTagRemoveButton } from '@/components/ui/tag/atlus-tag-remove-button';

export type AtlusTagSize = 'big' | 'small' | 'auto';

export type AtlusTagColor = 'orange' | 'green' | 'brown' | 'red';

interface TagColorDefinition {
  backgroundColor: string;
  textColor: string;
}

const tagsColorsDefinition: Record<AtlusTagColor, TagColorDefinition> = {
  orange: {
    backgroundColor: 'bg-off-white',
    textColor: 'text-orange',
  },
  green: {
    backgroundColor: 'bg-[#DFFBE6]',
    textColor: 'text-[#139733]',
  },
  brown: {
    backgroundColor: 'bg-[#F8F5F2]',
    textColor: 'text-[#895C30]',
  },
  red: {
    backgroundColor: 'bg-[#FFEFF7]',
    textColor: 'text-red',
  },
};

interface TagProps {
  size?: AtlusTagSize;
  text: string;
  onClose?: () => void;
  className?: string;
  color?: AtlusTagColor;
}

export const AtlusTag = ({
  text,
  onClose,
  className,
  size = 'auto',
  color = 'orange',
}: TagProps) => {
  const isAutoSize = size === 'auto';
  const isBigSize = size === 'big';
  const isSmallSize = size === 'small';

  const tagColor = tagsColorsDefinition[color];
  return (
    <div
      className={clsx(
        'inline-flex items-center rounded',
        tagColor.backgroundColor,
        { 'px-2 py-[6px] md:px-3 md:py-2': isAutoSize },
        { 'px-3 py-2': isBigSize },
        { 'px-2 py-[6px]': isSmallSize },
        'flex-shrink-0',
        className
      )}
    >
      <span
        className={clsx(
          'font-medium inline-block',
          tagColor.textColor,
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
