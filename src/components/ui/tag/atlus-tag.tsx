'use client'; //

import { HiX } from 'react-icons/hi';
import clsx from 'clsx';

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
      <span className="font-medium text-sm leading-[17px] text-orange inline-block">
        {text}
      </span>
      {onClose && (
        <button type="button" className="pt-px" onClick={onClose}>
          <HiX size={14} className="ml-[10px] text-orange" />
        </button>
      )}
    </div>
  );
};
