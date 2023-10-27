'use client';

import { JSXElementConstructor, ReactNode } from 'react';
import { MenuItem } from '@szhsin/react-menu';
import { IconBaseProps } from 'react-icons/lib/cjs/iconBase';

interface AtlusMenuItemProps {
  icon?: JSXElementConstructor<IconBaseProps>;
  text: ReactNode;
  onClick?: () => void;
}

export const AtlusMenuItem = ({ icon, text, onClick }: AtlusMenuItemProps) => {
  const Icon = icon ? icon : null;
  return (
    <MenuItem className="hover:bg-light-grey hover:cursor-pointer" onClick={onClick}>
      <div className="flex gap-3 px-4 py-[9px]">
        {Icon && <Icon size={16} className="text-dark-grey" />}
        <span className="text-soft-black text-sm font-medium leading-[17px]">{text}</span>
      </div>
    </MenuItem>
  );
};
