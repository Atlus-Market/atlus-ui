'use client';

import { HiX } from 'react-icons/hi';
import clsx from 'clsx';

interface AtlusTagRemoveButtonProps {
  onClick?: () => void;
  classNames?: string;
}

export const AtlusTagRemoveButton = ({ onClick, classNames }: AtlusTagRemoveButtonProps) => {
  return (
    <button type='button' className={clsx(
      'bg-off-white rounded',
      'pl-[10px] ',
      classNames
    )} onClick={onClick}>
      <HiX size={14} className='text-orange top-px relative' />
    </button>
  );
};
