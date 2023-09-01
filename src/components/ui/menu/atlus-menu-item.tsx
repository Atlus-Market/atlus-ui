'use client';

import { JSXElementConstructor } from 'react';
import { MenuItem } from '@szhsin/react-menu';
import { IconBaseProps } from 'react-icons/lib/cjs/iconBase';

interface AtlusMenuItemProps {
  icon?: JSXElementConstructor<IconBaseProps>;
  text: string;
  onClick?: () => void;
}

export const AtlusMenuItem = ({ icon, text,onClick }: AtlusMenuItemProps) => {
  const Icon = icon ? icon : null;
  return (
    <MenuItem className='hover:bg-light-grey hover:cursor-pointer w-max' onClick={onClick}>
      <div className='flex gap-3 px-4 py-[9px]'>
        {Icon && <Icon size={16} className='text-middle-grey' />}
        <span className='text-soft-black text-sm font-medium leading-[17px]'>{text}</span>
      </div>
    </MenuItem>
  );
};
