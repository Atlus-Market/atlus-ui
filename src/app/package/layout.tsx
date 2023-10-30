import { ReactNode } from 'react';
import Header from '@/components/common/header';
import { AtlusLayout } from '@/components/common/layout/atlus-layout';

export default function PackageLayout({ children }: { children: ReactNode }) {
  return (
    <AtlusLayout header={<Header />} sideBar={null}>
      {children}
    </AtlusLayout>
  );
}
