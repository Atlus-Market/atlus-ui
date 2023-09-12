'use client';

import { HiChevronDown, HiChevronUp } from 'react-icons/hi2';

interface AtlusExpandButtonProps {
  isExpanded?: boolean;
  text: string;
  onClick?: () => void;
}

export const AtlusExpandButton = ({
  text,
  isExpanded = false,
  onClick,
}: AtlusExpandButtonProps) => {
  return (
    <button
      className="text-orange text-sm font-medium leading-5 flex items-center"
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
