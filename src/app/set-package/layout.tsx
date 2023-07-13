import { ReactNode } from 'react';
import Header from '@/components/common/header';
import { LayoutStructure } from '@/app/set-package/components/layout-structure';
import { Sidebar } from '@/app/set-package/components/sidebar/sidebar';


export default function SetPackageLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <LayoutStructure sideBarChildren={<Sidebar />}>
        {children}
      </LayoutStructure>
    </>
  );
}
