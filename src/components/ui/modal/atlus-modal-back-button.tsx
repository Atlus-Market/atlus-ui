'use client';

import { AtlusButton } from '@/components/ui/button/atlus-button';
import { HiArrowLeft } from 'react-icons/hi2';

interface AtlusModalBackButtonProps {
  onClick?: () => void;
}

export const AtlusModalBackButton = ({ onClick }: AtlusModalBackButtonProps) => {
  return (
    <AtlusButton onClick={onClick} variant="clear">
      <HiArrowLeft size={24} />
    </AtlusButton>
  );
};
