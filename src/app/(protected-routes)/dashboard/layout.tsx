import { ReactNode } from 'react';
import clsx from 'clsx';
import './dashboard.css';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <div className={clsx('root:--atlus-layout-bg-color:red')}>{children}</div>;
}
