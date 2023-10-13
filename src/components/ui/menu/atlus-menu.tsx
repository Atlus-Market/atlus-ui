'use client';

import { Menu, MenuProps } from '@szhsin/react-menu';
import clsx from 'clsx';

import './atlus-menu.css';

interface AtlusMenuProps {
  menuButton: MenuProps['menuButton'];
  menuItems: MenuProps['children'];
}

export const AtlusMenu = ({ menuButton, menuItems }: AtlusMenuProps) => {
  return (
    <Menu
      menuClassName={clsx(
        'bg-white rounded-lg border-[1px] border-solid border-lightest-grey',
        'pt-[10px] pb-[12px]'
      )}
      menuButton={menuButton}
    >
      {menuItems}
    </Menu>
  );
};
