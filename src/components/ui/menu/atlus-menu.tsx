import { Menu, MenuProps, RootMenuProps } from '@szhsin/react-menu';
import clsx from 'clsx';

import './atlus-menu.css';

interface AtlusMenuProps extends RootMenuProps {
  menuButton: MenuProps['menuButton'];
  menuItems: MenuProps['children'];
}

export const AtlusMenu = ({ menuItems, ...rest }: AtlusMenuProps) => {
  return (
    <Menu
      menuClassName={clsx(
        'bg-white rounded-lg border-[1px] border-solid border-lightest-grey',
        'pt-[10px] pb-[12px]'
      )}
      gap={10}
      position="auto"
      align="end"
      {...rest}
    >
      {menuItems}
    </Menu>
  );
};
