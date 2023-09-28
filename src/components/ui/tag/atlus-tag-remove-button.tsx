'use client';

import { HiX } from 'react-icons/hi';
import clsx from 'clsx';
import { AtlusTagColor, AtlusTagSize, tagsColorsDefinition } from '@/components/ui/tag/atlus-tag';

interface AtlusTagRemoveButtonProps {
  size?: AtlusTagSize;
  onClick?: () => void;
  classNames?: string;
  color?: AtlusTagColor;
}

export const AtlusTagRemoveButton = ({
  onClick,
  classNames,
  size = 'auto',
  color = 'orange',
}: AtlusTagRemoveButtonProps) => {
  const isAutoSize = size === 'auto';
  const isBigSize = size === 'big';
  const isSmallSize = size === 'small';
  const tagColor = tagsColorsDefinition[color];
  return (
    <button
      type="button"
      className={clsx('rounded', 'pl-[10px] ', tagColor.backgroundColor, classNames)}
      onClick={onClick}
    >
      <HiX
        className={clsx(
          tagColor.textColor,
          'top-px relative',
          { 'text-xs md:text-sm': isAutoSize },
          { 'text-sm': isBigSize },
          { 'text-xs': isSmallSize }
        )}
      />
    </button>
  );
};
