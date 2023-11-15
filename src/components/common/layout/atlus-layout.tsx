import { ReactNode } from 'react';
import './atlus-layout.css';
import clsx from 'clsx';

interface AtlusLayoutProps {
  header?: ReactNode;
  sideBar: ReactNode;
  children: ReactNode;
  className?: string;
  mainContentAlignment?: 'left' | 'center';
}

export const AtlusLayout = ({
  header,
  sideBar,
  children,
  className,
  mainContentAlignment = 'left',
}: AtlusLayoutProps) => {
  const hasSideBar = !!sideBar;
  return (
    <div
      className={clsx(
        'atlus-layout',
        hasSideBar ? 'atlus-layout-with-sidebar' : 'atlus-layout-no-sidebar',
        className
      )}
    >
      <div className="atlus-header">{header}</div>
      {sideBar && <div className="atlus-sidebar">{sideBar}</div>}
      <div
        className={clsx(
          'atlus-content p-[18px] md:p-[42px]',
          mainContentAlignment === 'center' ? 'justify-center' : 'justify-start',
          'bg-[color:var(--atlus-layout-bg-color)]'
        )}
      >
        <div className="max-w-[1280px] w-full h-fit">{children}</div>
      </div>
    </div>
  );
};
