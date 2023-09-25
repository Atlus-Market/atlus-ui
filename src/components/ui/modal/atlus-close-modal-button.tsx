'use client';

import { HiOutlineX } from 'react-icons/hi';
import { AtlusButton } from '@/components/ui/button/atlus-button';
import { JSXElementConstructor } from 'react';
import { IconBaseProps } from 'react-icons/lib/cjs/iconBase';

interface CloseModalButtonProps {
  onClick?: () => void;
  icon?: JSXElementConstructor<IconBaseProps>;
}

export const AtlusCloseModalButton = ({ onClick, icon }: CloseModalButtonProps) => {
  const Icon = icon ? icon : HiOutlineX;
  return (
    <AtlusButton onClick={onClick} variant="clear">
      <Icon className="text-[20px] md:text-[30px]" />
    </AtlusButton>
  );
};
