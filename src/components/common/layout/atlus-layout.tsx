import { ReactNode } from 'react';
import './atlus-layout.css';

interface AtlusLayoutProps {
  header?: ReactNode;
  sideBar: ReactNode;
  children: ReactNode;
}

export const AtlusLayout = ({ header, sideBar, children }: AtlusLayoutProps) => {
  return (
    <div className="atlus-layout">
      <div className="atlus-header">{header}</div>
      <div className="atlus-sidebar">{sideBar}</div>
      <div className="atlus-content p-[42px]">
        <div className="max-w-[1000px] h-fit">{children}</div>
      </div>
    </div>
  );
};
