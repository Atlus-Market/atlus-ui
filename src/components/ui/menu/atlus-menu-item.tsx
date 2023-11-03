'use client';

import { JSXElementConstructor, ReactNode } from 'react';
import { MenuItem, MenuItemProps } from '@szhsin/react-menu';
import { IconBaseProps } from 'react-icons/lib/cjs/iconBase';

interface AtlusMenuItemProps extends MenuItemProps {
  icon?: JSXElementConstructor<IconBaseProps>;
  text: ReactNode;
}

export const AtlusMenuItem = ({ icon, text, ...rest }: AtlusMenuItemProps) => {
  const Icon = icon ? icon : null;
  return (
    <MenuItem className="hover:bg-light-grey hover:cursor-pointer min-w-[200px]" {...rest}>
      <div className="flex gap-3 px-4 py-[9px]">
        {Icon && <Icon size={16} className="text-dark-grey" />}
        <span className="text-soft-black text-sm font-medium leading-17">{text}</span>
      </div>
    </MenuItem>
  );
};
