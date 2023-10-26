'use client';

import { HiArrowLeft } from 'react-icons/hi2';
import { AtlusCloseModalButton } from '@/components/ui/modal/atlus-close-modal-button';

interface AtlusModalBackButtonProps {
  onClick?: () => void;
}

export const AtlusModalBackButton = ({ onClick }: AtlusModalBackButtonProps) => {
  return <AtlusCloseModalButton onClick={onClick} icon={HiArrowLeft} />;
};
