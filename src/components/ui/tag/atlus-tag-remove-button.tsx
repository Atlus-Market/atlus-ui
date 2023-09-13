'use client';

import { HiX } from 'react-icons/hi';
import clsx from 'clsx';

interface AtlusTagRemoveButtonProps {
  size?: 'big' | 'small';
  onClick?: () => void;
  classNames?: string;
}

export const AtlusTagRemoveButton = ({
  onClick,
  classNames,
  size = 'big',
}: AtlusTagRemoveButtonProps) => {
  return (
    <button
      type="button"
      className={clsx('bg-off-white rounded', 'pl-[10px] ', classNames)}
      onClick={onClick}
    >
      <HiX size={size === 'big' ? 14 : 12} className="text-orange top-px relative" />
    </button>
  );
};
