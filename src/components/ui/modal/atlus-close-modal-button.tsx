'use client';

import { HiOutlineX } from 'react-icons/hi';
import { AtlusButton } from '@/components/ui/button/atlus-button';

interface CloseModalButtonProps {
  onClick?: () => void;
}

export const AtlusCloseModalButton = ({ onClick }: CloseModalButtonProps) => {
  return (
    <AtlusButton
      onClick={onClick}
      variant='clear'>
      <HiOutlineX size={30} />
    </AtlusButton>
  );
};
