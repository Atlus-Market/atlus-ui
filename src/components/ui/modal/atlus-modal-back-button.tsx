'use client';

import { HiArrowLeft } from 'react-icons/hi2';
import { AtlusCloseModalButton } from '@/components/ui/modal/atlus-close-modal-button';
import { HiOutlineX } from 'react-icons/hi';
import { AtlusButton } from '@/components/ui/button/atlus-button';

interface AtlusModalBackButtonProps {
  onClick?: () => void;
}

export const AtlusModalBackButton = ({ onClick }: AtlusModalBackButtonProps) => {
  return (
    <AtlusButton
      onClick={onClick}
      variant="icon-only"
      color="grey"
      className="atlus-btn-22 md:!atlus-btn-24"
      iconOnlyIcon={<HiArrowLeft />}
      type="button"
    />
  );
};
