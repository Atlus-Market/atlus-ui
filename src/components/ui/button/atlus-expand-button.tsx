'use client';

import { HiChevronDown, HiChevronUp } from 'react-icons/hi2';
import clsx from 'clsx';

interface AtlusExpandButtonProps {
  isExpanded?: boolean;
  text: string;
  onClick?: () => void;
  classNames?: string;
}

export const AtlusExpandButton = ({
  text,
  isExpanded = false,
  onClick,
  classNames,
}: AtlusExpandButtonProps) => {
  return (
    <button
      className={clsx('text-orange text-sm font-medium leading-5 flex items-center', classNames)}
      onClick={onClick}
    >
      {text}
      {!isExpanded ? (
        <HiChevronDown size={16} className="ml-[3px]" />
      ) : (
        <HiChevronUp size={16} className="ml-[3px]" />
      )}
    </button>
  );
};
