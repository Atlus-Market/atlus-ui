'use client';

import { HiX } from 'react-icons/hi';
import clsx from 'clsx';
import { AtlusTagSize } from '@/components/ui/tag/atlus-tag';

interface AtlusTagRemoveButtonProps {
  size?: AtlusTagSize;
  onClick?: () => void;
  classNames?: string;
}

export const AtlusTagRemoveButton = ({
  onClick,
  classNames,
  size = 'auto',
}: AtlusTagRemoveButtonProps) => {
  const isAutoSize = size === 'auto';
  const isBigSize = size === 'big';
  const isSmallSize = size === 'small';
  return (
    <button
      type="button"
      className={clsx('bg-off-white rounded', 'pl-[10px] ', classNames)}
      onClick={onClick}
    >
      <HiX
        className={clsx(
          'text-orange top-px relative',
          { 'text-xs md:text-sm': isAutoSize },
          { 'text-sm': isBigSize },
          { 'text-xs': isSmallSize }
        )}
      />
    </button>
  );
};
