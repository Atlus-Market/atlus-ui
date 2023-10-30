import { ReactNode } from 'react';
import Header from '@/components/common/header/header';
import { AtlusLayout } from '@/components/common/layout/atlus-layout';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <AtlusLayout header={<Header />} sideBar={null}>
      {children}
    </AtlusLayout>
  );
}
