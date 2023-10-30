import { ReactNode } from 'react';
import './atlus-layout.css';
import clsx from 'clsx';

interface AtlusLayoutProps {
  header?: ReactNode;
  sideBar: ReactNode;
  children: ReactNode;
}

export const AtlusLayout = ({ header, sideBar, children }: AtlusLayoutProps) => {
  const hasSideBar = !!sideBar;
  return (
    <div
      className={clsx(
        'atlus-layout',
        hasSideBar ? 'atlus-layout-with-sidebar' : 'atlus-layout-no-sidebar'
      )}
    >
      <div className="atlus-header">{header}</div>
      {sideBar && <div className="atlus-sidebar">{sideBar}</div>}
      <div className="atlus-content p-[18px] md:p-[42px]">
        <div className="max-w-[1280px] w-full h-fit">{children}</div>
      </div>
    </div>
  );
};
