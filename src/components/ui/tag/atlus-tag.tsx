'use client';

import clsx from 'clsx';
import { AtlusTagRemoveButton } from '@/components/ui/tag/atlus-tag-remove-button';
import { ReactNode } from 'react';

export type AtlusTagSize = 'big' | 'small' | 'auto';

export type AtlusTagColor =
  | 'orange'
  | 'green-1'
  | 'green-2'
  | 'brown'
  | 'red-1'
  | 'red-2'
  | 'yellow'
  | 'gray';

interface TagColorDefinition {
  backgroundColor: string;
  textColor: string;
}

export const tagsColorsDefinition: Readonly<Record<AtlusTagColor, Readonly<TagColorDefinition>>> = {
  orange: {
    backgroundColor: 'bg-off-white',
    textColor: 'text-orange',
  },
  'green-1': {
    backgroundColor: 'bg-[#DFFBE6]',
    textColor: 'text-[#139733]',
  },
  'green-2': {
    backgroundColor: 'bg-[#DFFBF2]',
    textColor: 'text-[#129F70]',
  },
  brown: {
    backgroundColor: 'bg-[#F8F5F2]',
    textColor: 'text-[#895C30]',
  },
  'red-1': {
    backgroundColor: 'bg-[#FFEFF7]',
    textColor: 'text-red',
  },
  'red-2': {
    backgroundColor: 'bg-[#FCE4E8]',
    textColor: 'text-red',
  },
  yellow: {
    backgroundColor: 'bg-[#F9F8DA]',
    textColor: 'text-[#9F9919]',
  },
  gray: {
    backgroundColor: 'bg-lightest-grey',
    textColor: 'text-dark-grey',
  },
};

interface TagProps {
  size?: AtlusTagSize;
  text: ReactNode;
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
      {onClose && <AtlusTagRemoveButton onClick={onClose} size={size} color={color} />}
    </div>
  );
};
