import { ReactNode } from 'react';
import { AtlusLayout } from '@/components/common/layout/atlus-layout';
import Header from '@/components/common/header/header';

export default function TestLayout({ children }: { children: ReactNode }) {
  return (
    <AtlusLayout
      header={<Header />}
      sideBar={null}
      className="bg-[#FCFCFC]"
      mainContentAlignment="center"
    >
      {children}
    </AtlusLayout>
  );
}
